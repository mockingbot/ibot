import React from 'react'
import { storiesOf } from '@storybook/react'

import TooltipExample from './tooltip'
import EllipsisI from './ellipsis-i'
import EllipsisII from './ellipsis-ii'
import EllipsisIII from './ellipsis-iii'

storiesOf('Text', module)
.add('Tooltip', () => <TooltipExample />)
.add('Ellipsis I', () => <EllipsisI />)
.add('Ellipsis II', () => <EllipsisII />)
.add('Ellipsis III', () => <EllipsisIII />)
