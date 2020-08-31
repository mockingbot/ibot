import styled, { createGlobalStyle } from 'styled-components'

export const StyledMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  transition: all 0.2s ease-out;
  background-color: rgba(0, 0, 0, 0.4);

  &.mask-enter {
    opacity: 0;
  }

  &.mask-exit-active {
    opacity: 0;
  }
`

export const StyledModal = styled.div`
  position: relative;
  margin: 20vh auto auto;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: fit-content;
  min-height: 9.5rem;
  width: 31.25rem;
  font-size: 0.875rem;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.1);
  border-radius: 1px;
  color: #5b6b73;
  cursor: initial;
  transition: all 0.2s ease-out;

  &.is-v-centered {
    margin: 3rem auto;
  }

  &.fade-enter {
    opacity: 0;
    transform: translateY(-50vh);
  }

  &.fade-exit-active {
    opacity: 0;
    transform: translateY(-50vh);
  }

  .header {
    position: relative;
    display: flex;
    align-items: center;
    height: 60px;
    background: #FFFFFF;
    box-shadow: inset 0 -1px 0 0 #E8E8E8;
    border-bottom: 0px solid #E8E8E8;
    padding: 0 1.5em;

    .close-btn {
      margin-left: auto;
      font-size: 1em;
      color: #8d9ea7;
      transition: all 0.2s ease-in;
      &:hover {
        color: #415058;;
        transition-delay: 0.1s;
      }
    }
  }

  .content {
    padding: 30px 20px 35px;
  }
`

export const StyledFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  margin-top: 0;
  line-height: 1;
  background: #F7F7F7;
  padding-right: 16px;
  position: absolute;
  bottom: 0;
  width: 100%;
  font-family: PingFangSC-Regular,serif;

  & .cancel-btn {
    padding: 0px 1em;
    min-width: 5.25rem;
    height: 32px;
    border-radius: 2px;
    font-size: 14px;
    text-align: center;
    line-height: 22px;
    background: #fff;
    border: 1px solid #c8cdd0;
    color: #415058;
    margin-right: 10px;
    cursor: pointer;
    transition: all 0.2s ease-out 0s;
    &:hover{
      background-color: #8d9ea7;
      border: 1px solid #7d8694;
      color: #fff;
    }
  }

  & .confirm-btn {
    background: #ff6161;
    border-radius: 2px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 22px;
    height: 32px;
    min-width: 7rem;
    margin-right: 0.5em;
    padding: 0px 1em;
    cursor: pointer;
    transition: all 0.2s ease-out 0s;
    border-color: transparent;
    &:hover{
      background-color: #e04c4c;
    }
  }
`

export const StyledPortal = createGlobalStyle`
  .ModalPortal {
    top: 0;
    left: 0;
    z-index: 1050;
    padding: 3rem 1.5rem;
    width: 100vw;
    min-width: 64rem;
    height: auto;
    min-height: 100vh;
    background-color: #fff;
  }
`
