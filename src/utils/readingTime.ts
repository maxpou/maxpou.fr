const WORDS_PER_MINUTE = 220

export const readingTime = (body = '') =>
  Math.max(1, Math.round(body.split(/\s+/).length / WORDS_PER_MINUTE))
