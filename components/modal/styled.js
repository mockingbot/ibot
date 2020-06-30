import styled, { createGlobalStyle } from 'styled-components'

export const StyledMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30,41,46, 0.5);
  transition: background 0.2s;

  &.can-close {
    cursor: pointer;
  }
`

export const StyledModal = styled.div`
  position: relative;
  margin: 20vh auto auto;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: fit-content;
  transform: translateY(0);
  min-height: 9.5rem;
  font-size: 0.875rem;
  background-color: #fff;
  border-radius: 1px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.1);
  cursor: initial;
  transition: transform .3s, opacity .2s;

  &.is-v-centered {
    margin: 3rem auto;
  }

  header {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 55px;
    border-bottom: 1px solid #dedee4;
    color: #415058;
  }

  .close-btn {
    position: absolute;
    top: 50%;
    right: 0;
    padding: 0 20px;
    width: 54px;
    height: 100%;
    transform: translateY(-50%);
    line-height: 1;
    color: #8d9ea7;

    &:hover {
      color: #5b6b73;
    }
  }

  .content {
    padding: 30px 20px 35px;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    height: 55px;
    line-height: 1;
    border-top: 1px solid #f2f2f3;
  }

  .confirm-btn
  .cancel-btn {
    margin-left: 1.5em;
    min-width: 2em;
    height: 34px;
    color: #8d9ea7;
    transition: color ease-in-out .1s;

    &:enabled:hover {
      color: #5b6b73;
    }

    &:disabled {
      opacity: .5;
      cursor: not-allowed;
    }
  }

  .confirm-btn {
    font-weight: bold;
    color: #eb5648;

    &:enabled:hover {
      color: rgba(235, 86, 72, 0.2);
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
  &.FunctionalModal {
    width: 26.25rem;
  }
  &.DisplayModal {
    width: 40rem;
  }
`

export const StyledModalPortal = createGlobalStyle`
  .ModalPortal {
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

    &:not(.is-open) {
      pointer-events: none;

      .ModalMask {
        background-color: rgba(0, 0, 0, 0);
      }

      .Modal {
        transform: translateY(-50vh);
        opacity: 0;
      }
    }

    &.is-open {
      .Modal {
        transition-delay: .175s;
      }
    }
  }
`
