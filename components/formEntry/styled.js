import styled, { createGlobalStyle } from 'styled-components'

export const StyledFormKey = styled.span`
  &.FormEntry-Key {
    align-self: flex-start;
    display: flex;
    align-items: center;
    flex-basis: 7em;
    height: 34px;
  }

  .required-sign {
    margin: 0 0.25em;
    color: #eb5648;
  }
`

export const StyledFormVal = styled.span`
  &.FormEntry-Val {
    flex: 1;
    & > .Input, .CoreInput {
      display: block;
      width: 100%;
      .small{
        margin-top: 12px;
        margin-bottom: 12px;
      }
    }

    .Textarea,
    .CoreTextarea {
      display: block;
      width: 100%;
    }

    .CoreCheck,
    .Radio,
    .CoreRadio,
    .CheckGroup,
    .CoreCheckGroup,
    .RadioGroup,
    .CoreRadioGroup {
      margin-top: calc((34px - 1.5em)/2);
    }
  }
`

export const StyledForm = createGlobalStyle`
  &.FormEntry {
    display: flex;
    align-items: center;
    margin: 0.5em 0;
    min-height: 34px;
  }
`
