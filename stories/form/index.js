import React from 'react'
import { storiesOf } from '@storybook/react'

import InputExample from './Input'
import InputEmailExample from './InputEmail'
import InputNumberExample from './InputNumber'
import ConfirmInputNumberExample from './ConfirmInputNumber'
import RadioCheckExample from './RadioCheck'
import SelectExample from './Select'
import FormEntryExample from './FormEntry'
import CoreFormComponentExample from './CoreFormComponent'

storiesOf('Form Components', module)
.add('Input', () => <InputExample />)
.add('Email', () => <InputEmailExample />)
.add('Number', () => <InputNumberExample />)
.add('Confirm Number', () => <ConfirmInputNumberExample />)
.add('Radio/Check', () => <RadioCheckExample />)
.add('Select', () => <SelectExample />)
.add('Form Entries', () => <FormEntryExample />)
.add('Core Form Components', () => <CoreFormComponentExample />)
