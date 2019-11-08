import React from 'react'
import { action } from '@storybook/addon-actions'
import Root from '../../components/root'
import Button from '../../components/button'
import FormEntry, { FormLabel } from '../../components/formEntry'
import Icon from '../../components/icon'

import { PanelInputNumber, PanelSelectNumber } from '../components/ConfirmInputNumber'

export default class InputNumberExample extends React.PureComponent {
  state = {
    isCore: false,

    formData: {
      x: 5,
      y: -20,
      width: 120,
      height: 80,
      fontSize: 12,
      lineHeight: 1.5,
      textSpacing: 0,
      rotate: 0,
      opacity: 100,
    },
  }

  toggleCore = () => this.setState({ isCore: !this.state.isCore })

  onChange = (name, value, e) => this.setState(
    ({ formData }) => ({ formData: { ...formData, [name]: value } }),
    () => action('Number changed')(value, e),
  )

  getFormData = (name, defaultValue) => {
    const value = this.state.formData[name]

    return (
      value === 0 || value === '' || !!value
        ? value
        : defaultValue
    )
  }

  render () {
    const { isCore, formData } = this.state

    const theme = isCore ? 'core' : 'plain'

    return (
      <Root>
        <style>
          {`
          .FormEntry { width: 16rem; }
          .FormEntry .val { display: flex; justify-content: space-between; }
          .FormEntry .InputNumber, .FormEntry .CoreInputNumber { width: 48% !important; }

          .canvas {
            position: absolute;
            right: 2em;
            top: 2em;
            width: 50vw;
            height: 100%;
            border: 1px solid #eee;
          }
         `}
        </style>

        <div
          style={{
            position: 'fixed',
            bottom: '1em',
            right: '1em',
          }}
        >
          <Button
            type="primary"
            onClick={this.toggleCore}
            style={{ marginRight: '.5em' }}
          >
            Theme: {theme}
          </Button>
        </div>

        <div className="canvas">
          <div
            className="object"
            style={{
              position: 'absolute',
              left: `${formData.x}px`,
              top: `${formData.y}px`,
              width: `${formData.width}px`,
              height: `${formData.height}px`,
              fontSize: `${formData.fontSize}px`,
              lineHeight: `${formData.lineHeight}em`,
              letterSpacing: `${formData.textSpacing}px`,
              opacity: `${formData.opacity / 100}`,
              transform: `rotate(${formData.rotate}deg)`,

              backgroundColor: `#ccc`,
              padding: '.5em',
            }}
          >
            abc
          </div>
        </div>

        <h2>General Panel</h2>
        <FormEntry name="X/Y">
          <PanelInputNumber
            theme={theme}
            precision={0}
            min={-99999}
            max={99999}
            title="X"
            value={formData.x}
            onConfirm={this.onChange.bind(this, 'x')}
            dontSelectOnFocus
          />
          <PanelInputNumber
            theme={theme}
            precision={0}
            min={-99999}
            max={99999}
            title="Y"
            value={formData.y}
            onConfirm={this.onChange.bind(this, 'y')}
            dontSelectOnFocus
          />
        </FormEntry>

        <FormEntry name="W/H">
          <PanelInputNumber
            theme={theme}
            precision={0}
            title="W"
            min={1}
            max={99999}
            value={formData.width}
            onConfirm={this.onChange.bind(this, 'width')}
            dontSelectOnFocus
          />
          <PanelInputNumber
            theme={theme}
            precision={0}
            title="H"
            min={1}
            max={99999}
            value={formData.height}
            onConfirm={this.onChange.bind(this, 'height')}
            dontSelectOnFocus
          />
        </FormEntry>

        <FormLabel name="Font Size">
          <PanelSelectNumber
            theme={theme}
            precision={0}
            min={8}
            value={formData.fontSize}
            onConfirm={this.onChange.bind(this, 'fontSize')}
            optionList={[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 42, 48, 56, 64, 72, 144, 256]}
          />
        </FormLabel>

        <FormLabel name="Rotate">
          <PanelInputNumber
            theme={theme}
            title={<Icon name="degree" type="dora" />}
            precision={0}
            min={-360}
            max={360}
            suffix="°"
            value={formData.rotate}
            parser={v => isFinite(v) ? v % 360 : v}
            onConfirm={this.onChange.bind(this, 'rotate')}
          />
        </FormLabel>

        <FormLabel name="Opacity">
          <PanelInputNumber
            theme={theme}
            precision={1}
            suffix="%"
            max={100}
            min={0}
            value={formData.opacity}
            onConfirm={this.onChange.bind(this, 'opacity')}
          />
        </FormLabel>

        <FormEntry name="Paragraph">
          <PanelInputNumber
            theme={theme}
            desc="Line-height"
            precision={2}
            suffix="em"
            value={formData.lineHeight}
            onConfirm={this.onChange.bind(this, 'lineHeight')}
            dontSelectOnFocus
          />
          <PanelInputNumber
            theme={theme}
            desc="Text-spacing"
            precision={0}
            max={100}
            min={-20}
            value={formData.textSpacing}
            onConfirm={this.onChange.bind(this, 'textSpacing')}
            dontSelectOnFocus
          />
        </FormEntry>

        <FormEntry name="Disabled">
          <PanelInputNumber
            theme={theme}
            desc="Disabled"
            isDisabled
            precision={2}
            suffix="cm"
            value={5.67}
            onConfirm={() => null}
            dontSelectOnFocus
          />
        </FormEntry>
        <FormEntry name="Read-only">
          <PanelInputNumber
            theme={theme}
            desc="Disabled"
            readOnly
            precision={2}
            suffix="cm"
            value={5.67}
            onConfirm={() => null}
            dontSelectOnFocus
          />
        </FormEntry>
      </Root>
    )
  }
}
