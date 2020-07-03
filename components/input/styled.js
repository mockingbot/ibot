import styled from 'styled-components'

export const StyledInputLabel = styled.label`
  &.Textarea,
  &.CoreTextarea,
  &.Input,
  &.CoreInput {
    display: inline-block;
    color: #415058;
    input,
    textarea {
      font-size: inherit;
      color: inherit;
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      &[readonly] {
        color: #8d9ea7;
      }
      &:focus {
        outline: 0;
      }
      &::placeholder {
        color: #8d9ea7;
      }
    }
  }
  &.is-invalid input,
  &.is-invalid textarea,
  & input:not([type=email]):invalid,
  & textarea:invalid {
    border-color: #ff6161 !important;
    box-shadow: 0 0 6px 0 rgba(#ff6161, .5) !important;
  }
  &:not(.unstyled) {
    input,
    textarea {
      background-color: #f6f7f8;
      border: 1px solid #f2f2f3;
      border-radius: 2px;
      caret-color: #298df8;
      transition: 0.2s ease-out;
      transition-property: background, border, box-shadow, opacity;
      &:enabled:not([readonly]){
        :hover {
          border-color: #298df8;
        }
        :focus {
          background-color: #fff;
          border-color: #298df8;
          box-shadow: 0 0 6px 0 rgba(41, 141, 248, .5);
        }
      }
    }
  }
  &.is-readonly {
    color: #8d9ea7;
  }
  &.Input,
  &.CoreInput{
    &.regular {
      height: 34px;
      font-size: 14px;
    }
    &.small {
      height: 22px;
      font-size: 12px;
    }
    input {
      padding: 0 .5em;
      width: 100%;
      height: 100%;
    }
  }

  &.Textarea,
  &.CoreTextarea{
    &.regular {
      font-size: 14px;
    }
    &.small {
      font-size: 12px;
    }
    textarea {
      padding: .5em;
      width: 100%;
      min-height: 5em;
      max-height: 10em;
      resize: vertical;
      &:disabled,
      &[readonly] {
        resize: none;
      }
    }
  }
  &.CoreInput:not(.unstyled) input,
  &.CoreTextarea:not(.unstyled) textarea {
    background-color: #fff;
    border-color: #c8cdd1;
  }
  &.InputEmail, &.CoreInputEmail{
    &:not(.unstyled).isnt-valid input {
      box-shadow: 0 0 6px 0 rgba(255, 97, 97, .5) !important;
      border-color: #ff6161 !important;
    }
  }
`
