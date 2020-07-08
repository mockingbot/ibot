import styled, { createGlobalStyle } from 'styled-components'

export const StyledOverLay = styled.div`
  position: relative;
  margin: auto;
  padding: 0 3rem;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  .OverlayMask:not(.is-open) ~ & {
    opacity: 0;
    transform: translateY(-10vh);
  }
  .OverlayMask.is-open ~ & {
    opacity: 1;
    transform: none;
    transition-delay: 0.4s;
  }
  h1 {
    margin: 0.5em 0 1.5em;
    font-size: 1.5rem;
    font-weight: 500;
    color: #415058;
  }
  footer {
    margin-top: 4em;

    button:not(:last-child) {
      margin-right: 1em;
    }
  }
`

export const StyledOverLayMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255,255,255,0.98);
  color: #5b6b73;
  transition: opacity 0.3s ease-in;
  &:not(.is-open) {
    opacity: 0;
    pointer-events: none;
  }
`

export const StyledOverLayPortal = createGlobalStyle`
  &.OverlayPortal {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1050;
    display: flex;
    padding: 5rem 3rem;
    width: 100vw;
    min-width: 64rem;
    height: auto;
    min-height: 100vh;
    &:empty {
      display: none;
      pointer-events: none;
    }
    .OverlayCloseButton {
      position: fixed;
      top: 1em;
      left: 100vw;
      transform: translateX(calc(-100% - 1em));
      font-size: 3rem;
      color: #dedee4;
      opacity: 0.8;
      transition: all 0.2s ease-out;
      & .fore {
        fill: #8d9ea7;
        transition: all 0.2s ease-out;
        transition-duration: 0.3s;
      }
      &:enabled:hover {
        color: #eb5648;
        opacity: 1;
      }
      &:enabled:hover .fore {
        fill: #fff;
        transition-duration: 0.1s;
      }
    }
    .OverlayMask:not(.is-open) ~ .OverlayCloseButton {
      opacity: 0;
    }
    .OverlayMask.is-open ~ .OverlayCloseButton {
      opacity: 1;
    }
  }
`
