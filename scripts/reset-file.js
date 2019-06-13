#!/usr/bin/env node
/* eslint-disable no-console */

const rimraf = require('rimraf') // borrow from npm
const { fromRoot, mkdirP, copyFileSync } = require('./function')

const copyList = [
  // components/icon/fonts/
  [ 'node_modules/mb-icons/mb/fonts/mb-icons.woff', 'components/icon/fonts/mb-icons.woff' ],
  [ 'node_modules/mb-icons/mb/fonts/mb-icons.ttf', 'components/icon/fonts/mb-icons.ttf' ],
  [ 'node_modules/mb-icons/mb/fonts/mb-icons.svg', 'components/icon/fonts/mb-icons.svg' ],
  [ 'node_modules/mb-icons/dora/fonts/dora.woff', 'components/icon/fonts/dora.woff' ],
  [ 'node_modules/mb-icons/dora/fonts/dora.ttf', 'components/icon/fonts/dora.ttf' ],
  [ 'node_modules/mb-icons/dora/fonts/dora.svg', 'components/icon/fonts/dora.svg' ],

  // stories/json/
  [ 'node_modules/mb-icons/dora/icon-list.json', 'stories/json/dora.json' ],
  [ 'node_modules/mb-icons/dora/duo-list.json', 'stories/json/duo.json' ],
  [ 'node_modules/mb-icons/mb/icon-list.json', 'stories/json/mb.json' ],
]

rimraf.sync(fromRoot('lib/'))
mkdirP(fromRoot('stories/json/'))
for (const [ fromFile, toFile ] of copyList) {
  copyFileSync(fromRoot(fromFile), fromRoot(toFile))
}
