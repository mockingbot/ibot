import styled from 'styled-components'

export const StyledSelectLabel = styled.label`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  min-width: 3em;
  height: 34px;
  color: #5b6b73;
  cursor: pointer;
  transition: all 0.2s ease-out;
  button {
    flex: 1;
    width: calc(100% - 2em);
    height: 100%;
    text-align: start;
    cursor: inherit;
  }
  .caret {
    margin: 0 0.75em 0 1em;
    line-height: 0;
    color: #8d9ea7;
    svg {
      display: block;
      width: 6px;
      height: 4px;
      fill: currentColor;
      fill-rule: evenodd;
      transform: rotate(180deg);
      transition: all 0.3s ease-out;
    }
  }

  &:not(.unstyled) {
    padding-left: .5em;
    background-color: #f6f7f8;
    border: 1px solid #f2f2f3;
    border-radius: 2px;
  }

  &.small {
    height: 22px;
    font-size: 12px;
    .caret {
      margin-right: 0.5em;
    }
  }

  &:not(.is-disabled):not(.readonly):not(.unstyled):hover,
  &:not(.unstyled).is-open {
    border-color: #298df8;
  }

  &.is-open {
    &:not(.unstyled) {
      background-color: #fff;
      box-shadow: 0 0 6px 0 rgba(41, 141, 248, .5);
    }
    .caret svg {
      transform: rotate(0deg);
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.readonly {
    cursor: default
  }

  &.CoreSelect:not(.unstyled) {
    background-color: #fff;
    border: 1px solid #c8cdd1;
  }
`

export const StyledSelectMenuBase = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1100;
`

export const StyledSelectMenu = styled.ul`
  position: absolute;
  margin: 2px 0;
  padding: 0;
  display: block;
  max-width: 20em;
  min-width: 100%;
  min-height: 30px;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: none;
  font-size: 12px;
  list-style: none;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 10px 0 rgba(39,54,78,0.08), 4px 12px 40px 0 rgba(39,54,78,0.1);
  color: #5b6b73;
  transition: 0.2s ease-out;
  transition-property: transform, opacity;
  transform-origin: 50% 0;
  &::-webkit-scrollbar {
    display: block;
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(255,255,255,0.5);
  }
  &.is-empty {
    width: -moz-fit-content;
    width: -webkit-fit-content;
    width: fit-content;
  }
  &:not(.is-open) {
    opacity: 0;
    transform: scale(0.8);
  }
  &.x-center {
    left: 50%;
    transform: translateX(-50%);
    &:not(.is-open) {
      transform: scale(0.8) translateX(-50%);
    }
  }
  &.x-right {
    right: 0;
  }
  &.is-downward {
    top: 100%;
    bottom: initial;
  }
  &.is-upward {
    transform-origin: 50% 100%;
    top: initial;
    bottom: 100%;
  }
  &.is-open {
    opacity: 1;
    pointer-events: initial;
  }
  &.cant-select .SelectOption {
    cursor: default;
  }

  .SelectGroup {
    > .title {
      padding: 0 0.75em;
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-weight: bold;
    }
    > ul {
      margin: 0;
      padding: 0;
    }
  }
  .SelectOption {
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    > .Ellipsis {
      padding: 0 0.75em;
    }
    > .svg-icon {
      margin-left: auto;
      margin-right: 0.75em;

      &.check path {
        fill: #5b6b73;
      }
    }
    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    &.is-active {
      color: #298df8;
    }
    &:not(.empty-msg):not(.is-disabled):hover,
    &.is-active {
      background-color: #f6f7f8;
    }
    &.empty-msg {
      padding: 0 0.5em;
      color: #8d9ea7;
      cursor: not-allowed;
    }
  }
  &.CheckSelectMenu {
    &:not(.is-empty) {
      padding: 6px 0;
    }
    .SelectOption {
      height: 32px;
      .Ellipsis {
        padding: 0 16px;
      }
      .Ellipsis + .icon {
        margin-right: 10px;
      }
      &:hover,
      &.is-active:hover {
        color: #298df8;
      }
      &.is-active {
        background: none;
        color: inherit;
      }
    }
  }
  &.CoreSelectMenu {
    margin: 4px 0;
    &:not(.is-empty) {
      padding: 8px;
      min-height: 48px;
      max-height: 336px;
    }
    .SelectGroup > .title,
    .SelectOption {
      height: 32px;
      line-height: 32px;
      border-radius: 2px;
    }
  }
`
