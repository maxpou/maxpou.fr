import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ThemeContext } from '../ThemeContext'
import MoonIcon from './icons/moon.svg'
import SunIcon from './icons/sun.svg'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
`

const testoo = keyframes`
  from {
    transform: rotate(-30deg) translateY(-100%);
    opacity: 0.2;
  }
  to {
    transform: rotate(0deg) translateY(0%);
    opacity: 1;
  }
`

const DarkModeButton = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  padding: 8px 10px;
  color: #ffffff;
  font-weight: 700;
  margin: 10px 0;

  & .moon {
    animation: ${testoo} 1s linear;
  }
  & .sun {
    animation: ${rotate} 1s linear;
  }
`

const DarkToggle = ({ isExpanded = false }) => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  if (!colorMode) {
    return null
  }

  const toggleMode = () =>
    colorMode === 'light' ? setColorMode('dark') : setColorMode('light')
  const oppositeColor = colorMode === 'light' ? 'dark' : 'light'

  return (
    <DarkModeButton
      onClick={toggleMode}
      aria-label={`Activate ${oppositeColor} mode`}
    >
      {colorMode === 'dark' ? (
        <img
          src={SunIcon}
          alt="sun logo"
          width="24"
          height="24"
          className="sun"
        />
      ) : (
        <img
          src={MoonIcon}
          alt="moon Logo"
          width="24"
          height="24"
          className="moon"
        />
      )}
      {isExpanded && `Toggle ${oppositeColor} mode`}
    </DarkModeButton>
  )
}

export default DarkToggle
