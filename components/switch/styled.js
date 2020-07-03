import styled from 'styled-components'

export const StyledSwitch = styled.label`
  &.Switch {
    position: relative;
    display: inline-block;
    margin: 0 0.125em;
    width: 42px;
    height: 16px;
    vertical-align: text-bottom;
    background-color: #c8cdd1;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in;
    transition-delay: 0.15s;
    &.readonly {
      cursor: default;
    }
    > button {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22px;
      height: 22px;
      font-size: 14px;
      border: 2px solid #d0d7dd;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 4px 4px 0 rgba(0,0,0,0.04);
      cursor: inherit;
      transition: all 0.2s cubic-bezier(0.55, 0.06, 0.68, 0.19);
    }
    &.small {
      width: 26px;
      height: 10px;
      vertical-align: baseline;
      > button {
        width: 14px;
        height: 14px;
        border-width: 1px;
      }
    }
    &.is-checked {
      background-color: #eb5648;
      > button {
        transform: translate(21px, -50%);
        cursor: inherit;
      }
      &.small > button {
        transform: translate(13px, -50%);
      }
    }

    &.is-disabled {
      background-color: #dedee4;
      cursor: not-allowed;
      &.is-checked {
        background-color: rgba(235,86,72,0.35);
      }
      button {
        background-color: #f6f7f8;
      }
    }
  }
`
