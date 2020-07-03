import React, { PureComponent } from 'react'

import Root from '../components/root'
import Ellipsis from '../../components/ellipsis'

export default class EllipsisI extends PureComponent {
  render () {
    return (
      <Root>
        <style>
          {`#root { line-height: 1.5; }`}
        </style>

        <h2>Max</h2>
        <h3>Three ems</h3>
        <p>
          <Ellipsis max={4} withTooltip>墨刀是？</Ellipsis>
          <br />
          <Ellipsis max={4}>墨刀是一家有企业社会责任感的公司，对校园机构、学生社团和公益项目等方面格外关注！</Ellipsis>
        </p>

        <h3>100px</h3>
        <p>
          <Ellipsis max="100px">墨刀是？</Ellipsis>
          <br />
          <Ellipsis max="100px">墨刀是一家有企业社会责任感的公司，对校园机构、学生社团和公益项目等方面格外关注！</Ellipsis>
        </p>

        <h3>Longer words</h3>
        <p>
          <Ellipsis max="10em">Pneumonoultramicroscopicsilicovolcanoconiosis</Ellipsis>
          <br />
          <Ellipsis lang="en-GB" max="10em">Pneumonoultramicroscopicsilicovolcanoconiosis</Ellipsis>
          <br />
          <Ellipsis lang="de" max="10em">Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz</Ellipsis>
        </p>
        <h4>No hyphens for text attributed with CJK</h4>
        <p>
          <Ellipsis lang="zh" max="10em">Pneumonoultramicroscopicsilicovolcanoconiosis</Ellipsis>
        </p>

        <h2>Types</h2>
        <ul>
          <li>User: <Ellipsis type="user">Zhang Yuanyi</Ellipsis></li>
          <li>User: <Ellipsis type="user">Addison Forbes Montgomery-Shepherd</Ellipsis></li>
          <li>Email: <Ellipsis type="email">addison.f.montgomery@private.practice</Ellipsis></li>
          <li>Email: <Ellipsis type="email">barack@obama.org</Ellipsis></li>
          <li>ID: <Ellipsis type="id">@realDonaldTrump</Ellipsis></li>
          <li>ID: <Ellipsis type="id">@theWallStreetJournal</Ellipsis></li>
          <li>…</li>
        </ul>

        <h2>Display</h2>
        <ul>
          <li>
            <code>inline-block</code>:
            {' '}
            <Ellipsis display="inline-block" max="5">ABCDEFGHIJKLMNOPQRSTUVWXYZ</Ellipsis>
          </li>

          <li>
            <code>block</code>:
            {' '}
            <Ellipsis display="block" max="5">ABCDEFGHIJKLMNOPQRSTUVWXYZ</Ellipsis>
          </li>
        </ul>

        <h2>Links</h2>
        <p>
          <Ellipsis max="10" target="_blank" to="https://modao.cc">modao.cc</Ellipsis>
          <br />
          <Ellipsis max="10" target="_blank" to="https://mockingbot.com">mockingbot.com</Ellipsis>
          <br />
          <Ellipsis max="10" target="_blank" to="https://pro.modao.cc/posts/8177">pro.modao.cc/posts/8177</Ellipsis>
          <br />
          <Ellipsis max="10" target="_blank" to="https://mockingbot.com/posts/run-puppeteer-chrome-headless-on-ec2-amazon-linux">mockingbot.com/posts/run-puppeteer-chrome-headless-on-ec2-amazon-linux</Ellipsis>
        </p>

        <h2>HTML</h2>
        <p>
          <Ellipsis max="5" className="AppName" position="left" html="LOL<code>abc</code>" />
          <br />
          <Ellipsis max="5" className="AppName" position="left" html="LOL&amp;LOL&amp;" />
          <br />
          <Ellipsis max="5" className="AppName" position="left" html="LOL&amp;&lt;&gt;LOL&amp;" />
        </p>

        <h2>Tooltip or not</h2>
        <ul>
          <li>With: <Ellipsis max="8">Lick The Palm Of The Burning Handshake</Ellipsis></li>
          <li>With: <Ellipsis max="8" noTooltip={false}>Lick The Palm Of The Burning Handshake</Ellipsis></li>
          <li>Without: <Ellipsis max="8" noTooltip>Lick The Palm Of The Burning Handshake</Ellipsis></li>
          <li>Without: <Ellipsis max="8" noTooltip={true}>Lick The Palm Of The Burning Handshake</Ellipsis></li>
        </ul>
      </Root>
    )
  }
}
