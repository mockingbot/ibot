import styled from 'styled-components'

export const StyledGuid = styled.div`
  &.GuideBase {
    position: fixed;
    pointer-events: none;
  }
  .Guide {
    position: absolute;
    margin: 0.75em 0;
    min-width: 10em;
    font-size: 12px;
    filter: drop-shadow(0 2px 10px rgba(39,54,78,0.12)) drop-shadow(4px 12px 40px rgba(39,54,78,0.12));
    pointer-events: none;
    opacity: 0;
    transition: 0.2s ease-in-out;
    transition-property: transform, opacity;
    transform-origin: 50% 0;
    transform: scale(0.9);
    &.arrowed {
      margin: 0.75em 0;
    }
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
    .arrow {
      position: absolute;
      top: calc(-0.28em + 1px);
      left: calc(50% - 0.5em);
      font-size: 28px;
      line-height: 0;
      color: #fff;
    }
    &.x-left .arrow {
      left: 1em;
      right: initial;
    }
    &.x-right .arrow {
      left: initial;
      right: 1em;
    }
    svg {
      width: 1em;
      height: 0.28em;
      fill: currentColor;
      fill-rule: evenodd;
    }

    &.is-upward .arrow {
      top: initial;
      bottom: calc(-0.28em + 1px);
    }
    &.is-downward .arrow {
      transform: rotate(180deg);
    }

    .content {
      position: relative;
      padding: 1.5em 1.5em 1em;
      min-height: 32px;
      font-size: 14px;
      line-height: 2;
      background-color: #fff;
      border-radius: 4px;
      color: #8d9ea7;
    }
    header {
      margin: 0.25em 0 10px;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.2;
      color: #415058;
    }
    .close-btn {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      font-size: 14px;
      color: #c8cdd1;
      svg {
        width: 12px;
        height: 12px;

        .fore {
          fill: #fff;
        }
      }
    }
    footer {
      margin-top: 0.75em;
      text-align: end;
      button:enabled:hover {
        text-decoration: none;
        opacity: 0.8;
      }
    }
  }

`
