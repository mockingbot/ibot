import styled from 'styled-components'

export const StyledEllipsis = styled.span`
  &.Punctuation {
    display: inline-flex;
    display: inline-flex;
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
