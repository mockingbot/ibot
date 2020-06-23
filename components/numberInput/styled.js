import styled from 'styled-components'
import { StyledInputLabel } from '../input/styled'

export const StyledInputNumber = styled(StyledInputLabel)`
  &.InputNumber,
  &.CoreInputNumber {
    position: relative;
    display: inline-block;
    min-width: 2em;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    &:not(.unstyled).is-active input {
      background-color: #fff;
      border-color: #298df8;
      box-shadow: 0 0 6px 0 rgba(41, 141, 248, .5);
    }
    &:not(.unstyled).isnt-valid input {
      border-color: #ff6161 !important;
      box-shadow: 0 0 6px 0 rgba(255, 97, 97, .5) !important;
    }
    &.is-disabled {
      cursor: not-allowed;
      > * {
      opacity: 0.5;
      }
    }
    
    &.is-disabled,
    &.is-readonly {
      .action {
        visibility: hidden;
      }
    }
    
    input {
      padding-right: 1.5em;
      padding-left: .5em;
      font-family: inherit;
    }
    &.regular input{
        padding-right: 2em;
    }
  }
  
  
  &:not(.is-disabled):hover input:not([readonly]),
  input:not([readonly]):focus {
    & ~ .action {
      opacity: 1;
      transition: all 0.2s ease-out;
    }
  }
  
  .action {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.5em;
    height: 100%;
    text-align: center;
    
    &:not(.caret) {
    opacity: 0;
    }
    
    svg {
      height: 4px;
      fill: currentColor;
      fill-rule: evenodd;
    }
    
    &.caret {
      button {
        height: 100%;
      }
      svg {
        transition: transform 0.2s ease-out;
      }
      
      /.InputNumber.is-menu-open .caret svg {
        transform: rotate(180deg);
      }
    }
    
    button {
      display: block;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 50%;
      line-height: 0;
      color: #8d9ea7;
      transition: all 0.1s ease-out;
      &:hover {
        color: #5b6b73;
      }
      &:active {
        color: #298df8;
      }
      &[data-action=up] svg {
        margin: 5px 0 2px;
      }
      &[data-action=down] svg {
        margin: 2px 0 5px;
      }
    }
  }
  
  &.regular .action {
    top: 50%;
    transform: translateY(-50%);
    width: 2em;
    height: 28px;
  }
  &.with-desc {
    margin-top: 6px;
    margin-bottom: 1.5em;
  }
  
  .title,
  .desc,
  .prefix,
  .suffix {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 100%;
    pointer-events: none;
    user-select: none;
    border: 1px solid transparent;
  }
  
  &.is-empty {
    .prefix,
    .suffix {
      opacity: 0.3;
    }
  } 
  
  .title {
    margin-left: .5em;
    color: #8d9ea7;
  }
  
  .desc {
    top: 100%;
    width: 100%;
    height: 1.5em;
    line-height: 1.5;
    justify-content: center;
    color: #8d9ea7;
  }
  .prefix {
    margin-left: .5em;
  }
  .suffix {
    padding-left: .5em;
    padding-right: (1.5em + .125em);
    width: 100%;
    
    &:before {
    content: attr(data-value);
    display: inline-block;
    margin-right: 0.125em;
    width: -moz-fit-content;
    width: -webkit-fit-content;
    width: fit-content;
    overflow: hidden;
    opacity: 0;
    }
  }
`
