import styled from "styled-components";

export const StyledButton = styled.button`
  &.RegularButton,
  &.PrimaryButton,
  &.PrimaryCoreButton,
  &.RegularCoreButton,
  &.SecondaryCoreButton,
  &.TertiaryCoreButton {
    padding: 0 0.5em;
    height: 2.125rem;
    font-size: 0.875rem;
    border: 1px solid;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:not(button) {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .icon {
      margin-right: 0.125em;
    }
    &.small {
      height: 2em;
      font-size: 0.75rem;
    }
    .svg-icon.loading {
      margin-right: 0.5em;
      vertical-align: -.15em;
      animation: ibot-ani-spinning 1.5s infinite ease-out;
    }
  }
  
  &.PrimaryCoreButton,
  &.RegularCoreButton,
  &.SecondaryCoreButton,
  &.TertiaryCoreButton {
    padding: 0 1em;
    height: 2.375rem;
    &.small {
      height: 2em;
    }
    &:disabled {
      background-color: #f6f7f8;
      border-color: #dedee4;
      color: #c8cdd1;
      opacity: 1;
    }
  }
  
  &.PrimaryCoreButton {
    background-color: #eb5648;
    &,  
    &:link,
    &:visited {
      border-color: transparent;
      color: #fff;
    }
    &:enabled:hover,
    a&:hover {
      background-color: #ef776c;
      color: #fff;
    }
    &:enabled:active,
    a&:active {
      background-color: #bc4439;
      color: #e4b4b0;
    }
  }
  
  &.RegularCoreButton,
  &.SecondaryCoreButton {
    background-color: #fff;
    &,  
    &:link,
    &:visited {
      color: #eb5648;
    }
    &:enabled:hover,
    a&:hover {
      border-color: #ffa39e;
      color: #ef776c;
    }
    &:enabled:active,
    a&:active {
      border-color: #e84030;
      color: #bc4439;
    }
  }
  
  &.TertiaryCoreButton {
    background-color: #fff;
    border-color: #c8cdd1;
    &,  
    &:link,
    &:visited {
      color: #415058;
    }
    &:enabled:hover,
    a&:hover {
      background-color: #8d9ea7;
      border-color: #7d8694;
      color: #fff;
    }
    &:enabled:active,
    a&:active {
      background-color: #5b6b73;
      border-color: #415058;
    }
  }
  
  &.RegularButton {
    &,
    &:link,
    &:visited {
      color: #8d9ea7;
    }
    &:enabled:hover,
    a&:hover {
      color: #5b6b73;
    }
    &:disabled {
      opacity: 0.6;
    }
  }
  
  &.PrimaryButton {
    background-color: #8d9ea7;
    border-color: transparent;
    &,  
    &:link,
    &:visited {
      color: #fff;
    }
    &:enabled:hover,
    a&:hover {
      background-color: #5b6b73;
      color: #fff;
    }
    &:enabled:active,
    a&:active {
      color: rgba(255,255,255,0.6);
    }
  }
  
  &.TextButton,
  &.TextCoreButton {
    transition: all 0.1s ease-out;
    &,  
    &:link,
    &:visited {
      color: #298df8;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    &:enabled:hover,
    a&:hover {
    color: darken(#298df8, 10%);
    text-decoration: underline;
    }
    .svg-icon.loading {
      margin-right: 0.25em;
      vertical-align: -.15em;
      animation: ibot-ani-spinning 1.5s infinite ease-out;
    }
    .icon {
      margin-right: 0.125em;
    }
    &.small {
      height: 2em;
      font-size: 0.75rem;
    }
  }
  
  &.TextCoreButton {
    &,  
    &:link,
    &:visited {
      color: #eb5648;
    }
    &:enabled:hover,
    a&:hover {
    color: #ef776c;
    text-decoration: none;
    }
    &:enabled:active,
    a&:active {
      color: #bc4439;
    }
  }
`
