import styled, { createGlobalStyle } from 'styled-components'

export const StyledCoreMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30,41,46, 0.5);

  transition: all 0.2s ease-out;

  &.can-close {
    cursor: pointer;
  }
  &:not(.is-open) {
    opacity: 0;
    pointer-events: none;
    transition-delay: 0.2s;
  }
  &.is-open {
    opacity: 1;
  }
`

export const StyledCoreModal = styled.div`
  position: relative;
  margin: 15vh auto 3rem;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: fit-content;
  min-height: 12em;
  font-size: 0.875rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,0.1);
  cursor: initial;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.1);

  .CoreModalMask:not(.is-open) + & {
    opacity: 0;
    transform: translateY(-100%);
  }
  .CoreModalMask.is-open + & {
    opacity: 1;
    transform: none;
    transition-delay: 0.2s;
  }
  &.is-v-centered {
    margin: auto;
  }
  > header {
    display: flex;
    align-items: center;
    padding: 0 1.5em;
    height: 3.75rem;
    font-size: 1rem;
    font-weight: 500;
    border-bottom: 1px solid #dedee4;
    color: #415058;
  }
  > .content {
    padding: 1.5em;
  }
  > footer {
    padding: 0 1.5em 1.5em;
    .Button {
      margin-right: 0.5em;
    }
  }
  .close-btn {
    margin-left: auto;
    font-size: 1em;
    color: #8d9ea7;
    transition: all 0.2s ease-in;
    &:hover {
      color: #eb5648;
      transition-delay: 0.1s;
    }
  }

  &.AlertCoreModal,
  &.FormCoreModal {
    display: flex;
    flex-direction: column;
    width: 23.75rem;
    line-height: 1.5;
    .FormEntry {
      &:last-child {
        margin-bottom: -0.5em;
      }
      > .key {
        flex-basis: 7em;
      }
    }
  }
  &.FormCoreModal {
    width: 26.25rem;
  }
  &.FunctionalCoreModal {
    width: 38.875rem;
  }
  &.DisplayCoreModal {
    width: 40rem;
  }
`

export const StyledCorePortal = createGlobalStyle`
  &.CoreModalPortal {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1050;
    display: flex;
    padding: 3rem 1.5rem;
    width: 100vw;
    min-width: 64rem;
    height: auto;
    min-height: 100vh;
    &:empty {
      display: none;
      pointer-events: none;
    }
  }
`
