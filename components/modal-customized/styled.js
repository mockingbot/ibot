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
    }

    .close-btn:hover {
      color: #5b6b73;
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
  line-height: 1;
  background: #F7F7F7;
  font-family: PingFangSC-Regular,serif;

  & .cancel-btn {
    width: 68px;
    height: 32px;
    margin-right: 10px;
    background: #FFFFFF;
    border: 1px solid #C8CDD0;
    border-radius: 2px;
    //box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
    color: #415058;
  }

  & .confirm-btn {
    width: 90px;
    height: 32px;
    margin-right: 16px;
    background: #FF6161;
    border-radius: 2px;
    color: #FFFFFF;
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
