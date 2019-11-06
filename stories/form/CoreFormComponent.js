import React, { PureComponent } from 'react'
import { action } from '@storybook/react'

import Root from '../../components/root'
import {
  CoreInput,
  CoreInputEmail,
  CoreInputNumber,
  CoreConfirmInputNumber,
} from '../../components/input'
import { CoreRadio, CoreRadioGroup } from '../../components/radio'
import { CoreSelect } from '../../components/select'
import { CoreCheck, CoreCheckGroup } from '../../components/check'

export default class CoreFormComponent extends PureComponent {
  state = {
    tiangan: '',
  }

  onToggleTiangan = (isChecked, name, tiangan) => this.setState(
    { tiangan },
    () => action('Radio Checked')(isChecked, name, tiangan),
  )

  render() {
    const { tiangan } = this.state

    return (
      <Root>
        <style>
        {`
          .single label { margin-right: .5em }

          .row { margin-bottom: 1em }

          .row .CoreInput,
          .row .CoreSelect { margin-right: .5em; width: 15em; }
        `}
        </style>

        <div className="single">
          <CoreCheck name="天干" label="甲" />
          <CoreCheck name="天干" label="乙" />
          <CoreCheck name="天干" label="丙" />
        </div>

        <div className="single">
          <CoreRadio name="天干" label="甲" isChecked={tiangan === '甲'} onToggle={this.onToggleTiangan} />
          <CoreRadio name="天干" label="乙" isChecked={tiangan === '乙'} onToggle={this.onToggleTiangan} />
          <CoreRadio name="天干" label="丙" isChecked={tiangan === '丙'} onToggle={this.onToggleTiangan} />
        </div>

        <CoreCheckGroup name="latin" optionList={['A', 'B', 'C']} />
        <CoreRadioGroup name="latin" optionList={['A', 'B', 'C']} />

        <div className="row">
          <CoreInput placeholder="Input" />
          <CoreInputEmail placeholder="Input Email" />
        </div>

        <div className="row">
          <CoreInputNumber min={0} max={20} placeholder="Input Num. (0-20)" />
          <CoreConfirmInputNumber min={0} max={20} placeholder="Confirm Input Num. (0-20)" />
        </div>

        <div className="row">
          <CoreSelect optionList={['甲', '乙', '丙', '丁']} placeholder="Core Select" />
        </div>
      </Root>
    )
  }
}
