import styled from 'styled-components'

export const StyledDropDown = styled.label`
&.Dropdown.is-disabled {
  opacity: 0.5;
  > button {
  cursor: not-allowed;
  }
}

`

export const StyledDropDownMenu = styled.div`
  &.DropdownMenuBase {
    position: fixed;
    z-index: 1100;
    pointer-events: none;
  }

  .DropdownMenu {
    position: absolute;
    margin: 0.25em 0;
    width: -moz-fit-content;
    width: -webkit-fit-content;
    width: fit-content;
    min-width: 7em;
    font-size: 12px;
    filter: drop-shadow(0 2px 10px rgba(39,54,78,0.12)) drop-shadow(4px 12px 40px rgba(39,54,78,0.12));
    pointer-events: none;
    opacity: 0;
    transition: 0.2s ease-in-out;
    transition-property: transform, opacity;
    transform-origin: 50% 0;
    transform: scale(0.9);
    &.is-open {
      pointer-events: initial;
      opacity: 1;
      transform: scale(1);
    }
    &.x-left {
      left: 0;
    }
    &.x-right {
      left: initial;
      right: 0;
    }
    &.x-center {
      left: 50%;
      transform: scale(0.9) translateX(-50%);
      &.is-open {
      transform: scale(1) translateX(-50%);
      }
    }

    &.is-downward {
      top: 100%;
      bottom: initial;
    }
    &.is-upward {
      top: initial;
      bottom: 100%;
    }
    &.arrowed {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
      &.x-left.x-arrow-based {
      left: 50%;
      margin-left: -14px;
      }
      &.x-right.x-arrow-based {
      left: initial;
      right: 50%;
      margin-right: -14px;
      }
    }
    .arrow {
      position: absolute;
      top: 0;
      left: calc(50% - 0.5em);
      width: 1em;
      height: 0.375em;
      font-size: 14px;
      line-height: 0;
      fill: currentColor;
      fill-rule: evenodd;
      color: #fff;
      svg {
      position: absolute;
      width: auto;
      height: 5px;
      transform: translateY(-100%);
      }
    }

    &.dark .arrow {
      color: rgba(30, 41, 46, .9);
    }

    &.x-left .arrow {
      left: 0.5em;
      right: initial;
    }
    &.x-right .arrow {
      left: initial;
      right: 0.5em;
    }
    &.is-upward .arrow {
      transform: rotate(180deg);
      top: initial;
      bottom: 0;
    }

    .content {
      padding: 0.75em 0.5em;
      min-height: 32px;
      background-color: #fff;
      border-radius: 4px;
    }
    &.dark .content {
      background-color: rgba(30, 41, 46, .9);
      color: #fff;
    }

    ul.MenuList {
      margin: 0;
      padding: 0;
      list-style: none;
      text-align: center;
      color: #5b6b73;
      li {
        line-height: 32px;
        border-radius: 2px;
        cursor: pointer;
        &:not(.is-disabled):hover {
          background-color: #f6f7f8;
        }
        &.is-active {
          color: #298df8;
        }
        &.is-disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
  }
`
