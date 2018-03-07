import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../../packages/root/index'
import Icon from '../../packages/icon/index'
import Button from '../../packages/button/index'
import { Textarea } from '../../packages/form/index'
import {
  Tooltip, Ellipsis,
  User, TeamName, AppName, WidgetName,
} from '../../packages/text/index'

import TooltipExample from './tooltip'
import EllipsisI from './ellipsis-i'
import EllipsisII from './ellipsis-ii'
import EllipsisIII from './ellipsis-iii'

storiesOf('Text', module)
.add('Tooltip', () => <TooltipExample />)
.add('Ellipsis I', () => <EllipsisI />)
.add('Ellipsis II', () => <EllipsisII />)
.add('Ellipsis III', () => <EllipsisIII />)
