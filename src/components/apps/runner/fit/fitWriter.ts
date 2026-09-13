/**
 * Minimal FIT file writer (binary protocol v2, profile 21.214).
 *
 * Only what a workout file needs: little-endian records, one definition
 * message before every data message. Re-emitting the definition each time
 * costs a few bytes but lets every message carry its own string lengths.
 */

const HEADER_SIZE = 14
const PROTOCOL_VERSION = 2
const PROFILE_VERSION = 21214

export const BaseType = {
  enum: 0x00,
  uint8: 0x02,
  uint16: 0x84,
  uint32: 0x86,
  uint32z: 0x8c,
  string: 0x07,
} as const

export type BaseTypeValue = (typeof BaseType)[keyof typeof BaseType]

export type FitField = {
  num: number
  baseType: BaseTypeValue
  value: number | string | null | undefined
}

const INVALID: Record<number, number> = {
  [BaseType.enum]: 0xff,
  [BaseType.uint8]: 0xff,
  [BaseType.uint16]: 0xffff,
  [BaseType.uint32]: 0xffffffff,
  [BaseType.uint32z]: 0,
}

const CRC_TABLE = [
  0x0000, 0xcc01, 0xd801, 0x1400, 0xf001, 0x3c00, 0x2800, 0xe401, 0xa001,
  0x6c00, 0x7800, 0xb401, 0x5000, 0x9c01, 0x8801, 0x4400,
]

export function crc16(
  bytes: Uint8Array,
  start = 0,
  end = bytes.length,
): number {
  let crc = 0
  for (let i = start; i < end; i++) {
    const byte = bytes[i]
    let tmp = CRC_TABLE[crc & 0x0f]
    crc = (crc >> 4) & 0x0fff
    crc = crc ^ tmp ^ CRC_TABLE[byte & 0x0f]
    tmp = CRC_TABLE[crc & 0x0f]
    crc = (crc >> 4) & 0x0fff
    crc = crc ^ tmp ^ CRC_TABLE[(byte >> 4) & 0x0f]
  }
  return crc & 0xffff
}

class ByteWriter {
  private buffer = new Uint8Array(1024)
  private view = new DataView(this.buffer.buffer)
  length = 0

  private ensure(extra: number) {
    if (this.length + extra <= this.buffer.length) return
    let size = this.buffer.length
    while (size < this.length + extra) size *= 2
    const next = new Uint8Array(size)
    next.set(this.buffer.subarray(0, this.length))
    this.buffer = next
    this.view = new DataView(next.buffer)
  }

  u8(value: number) {
    this.ensure(1)
    this.view.setUint8(this.length, value & 0xff)
    this.length += 1
  }

  u16(value: number) {
    this.ensure(2)
    this.view.setUint16(this.length, value & 0xffff, true)
    this.length += 2
  }

  u32(value: number) {
    this.ensure(4)
    this.view.setUint32(this.length, value >>> 0, true)
    this.length += 4
  }

  bytes(value: Uint8Array) {
    this.ensure(value.length)
    this.buffer.set(value, this.length)
    this.length += value.length
  }

  toUint8Array(): Uint8Array {
    return this.buffer.slice(0, this.length)
  }
}

function fieldSize(field: FitField): number {
  if (field.baseType === BaseType.string) {
    return encodeString(field.value).length
  }
  switch (field.baseType) {
    case BaseType.enum:
    case BaseType.uint8:
      return 1
    case BaseType.uint16:
      return 2
    default:
      return 4
  }
}

function encodeString(value: unknown): Uint8Array {
  const text = typeof value === 'string' ? value : ''
  const encoded = new TextEncoder().encode(text)
  const out = new Uint8Array(encoded.length + 1)
  out.set(encoded)
  return out
}

export class FitFileWriter {
  private records = new ByteWriter()

  writeMesg(globalMesgNum: number, fields: FitField[]): this {
    const present = fields.filter(
      field => field.value !== null && field.value !== undefined,
    )

    // Definition message, local message type 0
    this.records.u8(0x40)
    this.records.u8(0) // reserved
    this.records.u8(0) // architecture: little endian
    this.records.u16(globalMesgNum)
    this.records.u8(present.length)
    for (const field of present) {
      this.records.u8(field.num)
      this.records.u8(fieldSize(field))
      this.records.u8(field.baseType)
    }

    // Data message, local message type 0
    this.records.u8(0x00)
    for (const field of present) {
      if (field.baseType === BaseType.string) {
        this.records.bytes(encodeString(field.value))
        continue
      }
      const raw = Number(field.value)
      const value = Number.isFinite(raw) ? raw : INVALID[field.baseType]
      switch (field.baseType) {
        case BaseType.enum:
        case BaseType.uint8:
          this.records.u8(value)
          break
        case BaseType.uint16:
          this.records.u16(value)
          break
        default:
          this.records.u32(value)
      }
    }

    return this
  }

  close(): Uint8Array {
    const data = this.records.toUint8Array()
    const out = new Uint8Array(HEADER_SIZE + data.length + 2)
    const view = new DataView(out.buffer)

    view.setUint8(0, HEADER_SIZE)
    view.setUint8(1, PROTOCOL_VERSION)
    view.setUint16(2, PROFILE_VERSION, true)
    view.setUint32(4, data.length, true)
    out.set([0x2e, 0x46, 0x49, 0x54], 8) // ".FIT"
    view.setUint16(12, crc16(out, 0, 12), true)

    out.set(data, HEADER_SIZE)
    view.setUint16(
      HEADER_SIZE + data.length,
      crc16(out, 0, HEADER_SIZE + data.length),
      true,
    )

    return out
  }
}

/** FIT epoch: 1989-12-31T00:00:00Z. */
export function toFitDateTime(date: Date): number {
  return Math.floor(date.getTime() / 1000) - 631065600
}
