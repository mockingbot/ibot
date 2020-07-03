import styled from 'styled-components'

export const StyledToolTipSpan = styled.span`
  div.Tooltip {
    width: -moz-fit-content;
    width: -webkit-fit-content;
    width: fit-content;
  }
  &.Ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: 100%;
    vertical-align: bottom;
    &.isnt-truncated {
      display: inline;
      max-width: initial !important;
    }
    &.is-truncated:before {
      content: '';
      display: block;
    }
    &[data-type=user],
    &[data-type=id] {
      max-width: 10em;
    }
    &[data-type=email] {
      max-width: 12em;
    }
    &[data-type=org] {
      max-width: 15em;
    }
    &[data-type=team] {
      max-width: 10em;
    }
    &[data-type=app] {
      max-width: 15em;
    }
    &[data-type=widget] {
      max-width: 12em;
    }
  }
`

export const StyledToolTip = styled.div`
  &.TipBase {
    position: fixed;
    z-index: 1200;
    pointer-events: none;
  }
  .Tip {
    position: absolute;
    padding: 0.33em 0.5em;
    font-size: 12px;
    line-height: 1.4;
    pointer-events: none;
    speak: none;
    transition-property: opacity, transform;
    transition-duration: 0.15s;
    user-select: none;
    filter: opacity(0.8);
    &.arrowed {
      padding: 0.33em 0.75em;
    }
    & > .arrow {
      position: absolute;
      z-index: 10;
      display: block;
      font-size: 14px;
      line-height: 0;
      svg {
        width: 1em;
        height: 0.375em;
        fill: #415058;
      }
    }
    &:not(.is-open) {
      opacity: 0 !important;
    }
    &.is-open {
      opacity: 1;
    }
    &.on-top {
      left: 50%;
      bottom: 100%;
      transform: translate(-50%, -10%);
      &.arrowed {
        margin-bottom: 0.25em;
      }
      &.is-open {
        transform: translate(-50%);
      }
    }
    &.on-bottom {
      left: 50%;
      top: 100%;
      transform: translate(-50%, 10%);
      &.arrowed {
        margin-top: 0.25em;
      }
      &.is-open {
        transform: translate(-50%);
      }
    }
    &.on-left {
      right: 100%;
      top: 50%;
      transform: translate(-10%, -50%);
      &.is-open {
        transform: translate(0, -50%);
      }
    }
    &.on-right {
      left: 100%;
      top: 50%;
      transform: translate(10%, -50%);
      &.is-open {
        transform: translate(0, -50%);
      }
    }
    &.on-top > .arrow {
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      &.on-top > .arrow svg {
        transform: rotate(180deg);
      }
    }
    &.on-bottom > .arrow {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    &.on-right > .arrow {
      top: 50%;
      left: 0;
      font-size: 16px;
      transform: translateY(-50%);
      svg {
        transform: rotate(-90deg);
      }
    }
    &.on-left > .arrow {
      top: 50%;
      right: 0;
      font-size: 16px;
      transform: translateY(-50%);
      svg {
        transform: rotate(90deg);
      }
    }
    > .content {
      position: relative;
      z-index: 20;
      padding: 0.5em;
      width: -moz-max-content;
      width: max-content;
      min-width: 3em;
      max-width: 20em;
      min-height: 2em;
      background-color: #415058;
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
      border-radius: 2px;
      color: #fff;
    }
  }
  .CoreTip {
    filter: opacity(0.9);
    > .arrow svg {
      fill: #1e292e;
    }
    > .content {
      padding: 0.5em 0.75em;
      background-color: #1e292e;
      border-radius: 4px;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.15);
    }
  }
`
