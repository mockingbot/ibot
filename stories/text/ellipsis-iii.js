import React, { PureComponent } from 'react'

import { Root, User, TeamName } from '../../components'

export default class EllipsisIII extends PureComponent {
  render() {
    return (
      <Root>
        <style>
        {`#root { line-height: 1.5; }`}
        {`.Punctuation.with-quote .Ellipsis { font-weight: bold; }`}
        {`p { margin: .5em 0; width: 20em; }`}
        </style>

        <h2>User</h2>
        <p>Are you sure you want to delete the collaborator, <User withQuote withQuestionMark name="Sir Issac Newton" /></p>
        <p>Are you sure you want to delete the collaborator, <User withQuote withQuestionMark name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" /></p>
        <p>Are you sure you want to delete the collaborator, <User withQuote name="Sir Issac Newton" /> for good?</p>
        <p>Are you sure you want to delete the collaborator, <User withQuote name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" /> for good?</p>
        <p>Are you sure you want to delete the collaborator, <User withQuote withComma name="Sir Issac Newton" /> for good?</p>
        <p>Are you sure you want to delete the collaborator, <User withQuote withComma name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" /> for good?</p>
        <p>You’ve succeeded deleting the collaborator, <User withQuote withPeriod name="Sir Issac Newton" /></p>
        <p>You’ve succeeded deleting the collaborator, <User withQuote withPeriod name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" /></p>

        <p lang="zh">您確定要刪除協作者<User withQuote withQuestionMark name="Sir Issac Newton" /></p>
        <p lang="zh">您確定要刪除協作者<User withQuote withQuestionMark name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" /></p>
        <p lang="zh">您確定要刪除協作者<User withQuote name="Sir Issac Newton" />永久地？</p>
        <p lang="zh">您確定要刪除協作者<User withQuote name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" />永久地？</p>
        <p lang="zh">您確定要刪除協作者<User withQuote withComma name="Sir Issac Newton" />永久地？</p>
        <p lang="zh">您確定要刪除協作者<User withQuote withComma name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" />永久地？</p>
        <p lang="zh">您已成功刪除協作者<User withQuote withPeriod name="Sir Issac Newton" /></p>
        <p lang="zh">您已成功刪除協作者<User withQuote withPeriod name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" /></p>

        <h2>Team</h2>
        <p>Are you sure you want to delete team <TeamName withQuote withQuestionMark name="無視" /></p>
        <p>Are you sure you want to delete team <TeamName withQuote withQuestionMark name="無視無事無識應用股分有限公司" /></p>
        <p>Are you sure you want to delete team <TeamName withComma name="無視" /> for good?</p>
        <p>Are you sure you want to delete team <TeamName withComma name="無視無事無識應用股分有限公司" /> for good?</p>
        <p>Are you sure you want to delete team <TeamName withQuote withComma name="無視" /> for good?</p>
        <p>Are you sure you want to delete team <TeamName withQuote withComma name="無視無事無識應用股分有限公司" /> for good?</p>
        <p>You’ve succeeded deleting team <TeamName withQuote withPeriod name="無視" /></p>
        <p>You’ve succeeded deleting team <TeamName withQuote withPeriod name="無視無事無識應用股分有限公司" /></p>

        <p lang="zh">您確定要刪除團隊<TeamName withQuote withQuestionMark name="無視" /></p>
        <p lang="zh">您確定要刪除團隊<TeamName withQuote withQuestionMark name="無視無事無識應用股分有限公司" /></p>
        <p lang="zh">您確定要刪除團隊<TeamName withComma name="無視" />永久地？</p>
        <p lang="zh">您確定要刪除團隊<TeamName withComma name="無視無事無識應用股分有限公司" />永久地？</p>
        <p lang="zh">您確定要刪除團隊<TeamName withQuote withComma name="無視" />永久地？</p>
        <p lang="zh">您確定要刪除團隊<TeamName withQuote withComma name="無視無事無識應用股分有限公司" />永久地？</p>
        <p lang="zh">您已成功刪除團隊<TeamName withQuote withPeriod name="無視" /></p>
        <p lang="zh">您已成功刪除團隊<TeamName withQuote withPeriod name="無視無事無識應用股分有限公司" /></p>
      </Root>
    )
  }
}
