import styled, { createGlobalStyle } from "styled-components";

export const StyledMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.state === 'entered' ? `rgba(0, 0, 0, .4)` : 'rgba(0, 0, 0, 0)'};;
  transition: background .2s;
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
  transition: transform .3s ease;
  transform: translateY(${props => props.state === 'entered' || props.state === 'exited'? 0 : -50}vh);
`

export const StyledPortal = createGlobalStyle`
  top: 0;
  left: 0;
  z-index: 1050;
  padding: 3rem 1.5rem;
  width: 100vw;
  min-width: 64rem;
  height: auto;
  min-height: 100vh;
  background-color: #fff;
`
