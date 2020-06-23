import styled from "styled-components";
// import Tooltip from '../tooltip/index'

export const StyledEllipsis = styled.span`
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
    &Tip {
      hyphens: auto;
    }
  }
  
  &.Punctuation {
    display: inline-flex;
    align-items: baseline;
    &.isnt-truncated {
      display: inline;
    }
    &.with-period {
      &:after {
        content: '. ';
      }    
      &:lang(zh):after {
        content: '\3002';
      }
    }
    &.with-comma {
      &:after {
        content: ', ';
      }
      &:lang(zh):after {
        content: '\FF0C';
      }
    }
    &.with-question-mark:after {
      &:after {
        content: '? ';
      }
      &:lang(zh):after {
        content: '\FF1F';
      }

    }
    &.with-quote {
      &:before {
        content: '\201C';
      }
      &:after {
        content: '\201D';
      }
      &.with-period:after {
        content: '\201D. ';
      }
      &.with-comma:after {
        content: '\201D, ';
      }
      &.with-question-mark:after {
        content: '\201D? ';
      }
      &:lang(zh):before {
        content: '\300C';
      }
      &:lang(zh):after {
        content: '\300D';
      }
      &.with-period:lang(zh):after {
        content: '\300D\3002';
      }
      &.with-comma:lang(zh):after {
        content: '\300D\FF0C';
      }
      &.with-question-mark:lang(zh):after {
        content: '\300D\FF1F';
      }
    }
  }
`
