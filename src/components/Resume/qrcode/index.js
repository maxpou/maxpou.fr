import React from 'react'
import styled from 'styled-components'
import QrImage from './qr-code.png'
import { media } from '../tokens'
import cleanupUrl from '../../../lib/cleanupUrl'

const Img = styled.img`
  width: 100px;
`

const QrCodeContainer = styled.a`
  top: 20px;
  float: right;
  position: relative;
  text-decoration: none;
  padding-left: 5px;
  padding-bottom: 11px;

  @media ${media.medium} {
    display: none;
  }
`

const Description = styled.span`
  display: block;
  font-size: 0.8em;
  margin-top: -10px;
  color: var(--color-cv-textLight);
`

const QrCode = ({ url }) => {
  return (
    <QrCodeContainer href={url}>
      <Img src={QrImage} alt="QR Code" />
      <Description>{cleanupUrl(url)}</Description>
    </QrCodeContainer>
  )
}

export default QrCode
