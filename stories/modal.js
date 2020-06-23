import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../components/root'
import InputNumber from '../components/numberInput'
import Input, { Textarea } from '../components/input'
import Select from '../components/select'
import { CheckGroup } from '../components/check'
import { RadioGroup } from '../components/radio'
import FormEntry, { FormLabel } from '../components/formEntry'
import Icon from '../components/icon'
import Modal from '../components/modal'
import TransitionModal from '../components/modal-customized'
import PureTransitionModal from '../components/modal-blank'

import Switch from '../components/switch'
import { WidgetName } from './components/Ellipsis'

storiesOf('Modal', module)
  .add('Default', () => (
    <Root>
      <Modal isOpen={true} onClose={action('Modal closed')} />
    </Root>
  ))
  .add('Customized', () => <ModalExample />)

  .add('Blank', () => <ModalExample2 />)
  // .add('Test2', () => <ModalExample2 />)

  .add('Openers', () => (
    <Root>
      <p>
        <Modal
          openerType="switch"

          isOpen={true}
          title="Modal’s Title"

          onToggle={action('Modal toggled, `isOpen`')}
        >
        Modal opened with <Switch />
        </Modal>
      </p>

      <p>
        <Modal openerType="custom" /* Shall not display */ />

        <Modal
          openerType="custom" opener="Custom Opener"
          type="form"
          onToggle={action('Modal toggled, `isOpen`')}
        />
      </p>

      <p>
        <style scoped>
          {`p button { margin-right: 1em; }`}
          {`p button .icon { font-size: 1.2em; vertical-align: -.1em }`}
        </style>

        <Modal
          opener="Open a Modal"
          openerType="primary"

          isOpen={false}
          title="Modal’s Title"

          onToggle={action('Modal toggled, `isOpen`')}
        >
        Modal opened with a button
        </Modal>

        <Modal
          opener="Open a Modal"
          openerType="regular"

          isOpen={false}
          title="Modal’s Title"

          onToggle={action('Modal toggled, `isOpen`')}
        >
        Modal opened with a button
        </Modal>

        <Modal
          opener="Open a Modal"
          openerType="text"

          isOpen={false}
          title="Modal’s Title"

          onToggle={action('Modal toggled, `isOpen`')}
        >
        Modal opened with a button
        </Modal>

        <Modal
          isOpen={false}
          opener={[<Icon key="icon" name="share" />, 'Open a Modal']}
          openerType="text"
          title="Modal’s Title"

          onToggle={action('Modal toggled, `isOpen`')}
        >
        Modal opened with a button
        </Modal>
      </p>

      <p>
      Opening a modal in a modal:{' '}
        <Modal
          openerType="switch"

          isOpen={false}
          title="Modal’s Title"

          onToggle={action('Modal toggled, `isOpen`')}
        >
        Give me an alert:{' '}
          <Modal
            openerType="switch" type="alert" title="Yay!"
            onToggle={action('MiM toggled, `isOpen`')}
          >
          Modal in a modal is open!
          </Modal>
        </Modal>
      </p>
    </Root>
  ))
  .add('Advanced', () => (
    <Root>
      <style>
        {`#root .FormEntry { width: 22em; }`}
        {`h2 + .FormEntry { margin-top: -1em; }`}
        {`.AlertModal p, .FormModal p { margin: .5em 0; }`}
        {`.FormEntry > .key { flex-basis: 15em; }`}
        {`button.text .icon { margin-right: .25em; font-size: 1.1em; vertical-align: -.1em; }`}
      </style>

      <h2>Alert</h2>
      <FormLabel name="Default">
        <Modal
          opener="Alert"
          openerType="text"

          type="alert"
          title="Warning"
          onToggle={action('Modal toggled, `isOpen`')}
        >
          <p>
          An alert automatically comes with a confirm button,
          whether you provide the <code>onConfirm</code> callback or not.
          </p>
        </Modal>
      </FormLabel>

      <FormLabel name="Action Callbacks">
        <Modal
          openerType="switch"

          type="alert"
          title="Warning"

          onConfirm={action('Confirmed')}
          confirmText="Try Me!"

          onCancel={action('Cancelled')}
          cancelText="Nope!"
          onToggle={action('Modal toggled, `isOpen`')}
        >
          <p>Something serious just happened!</p>
          <p>P.S. Try the cancel and confirm buttons below.</p>
        </Modal>
      </FormLabel>

      <FormLabel name="Not closing after actions">
        <Modal
          openerType="switch"

          type="alert"
          title="Warning"

          onConfirm={action('Confirmed')}
          onCancel={action('Cancelled')}
          shouldCloseOnAction={false}
          onToggle={action('Modal toggled, `isOpen`')}
        >
          <p>Try the cancel and confirm buttons below.</p>
          <p>You get to decide whether to close the modal after actions or not.</p>
        </Modal>
      </FormLabel>

      <FormLabel name={<span>Can’t close <strong> (serious)</strong></span>}>
        <Modal
          openerType="switch"

          type="alert"
          title="Inclosable Modal"
          portalClassName="cant-close-modal-portal"

          canClose={false}

          onOpen={() => Object.assign(window, {
            ccm_interval: setInterval(() => {
              try {
                const $portal = document.querySelector('.cant-close-modal-portal')
                const $countdown = $portal.querySelector('.countdown')
                let countdown = parseInt($countdown.innerHTML)

                countdown--
                $countdown.innerHTML = `${countdown}s`

                if (countdown <= 0) {
                  clearInterval(window.ccm_interval)

                  /**
                 * **NOTE** Removing the `is-open` class is an anti-pattern to
                 * close a modal, you should instead alter the `isOpen` property
                 * of the component in its stateful parent for such purpose.
                 */
                  $portal.classList.remove('is-open')
                }
              } catch (e) {
                clearInterval(window.ccm_interval)
              }
            }, 1000),
          })}

          onToggle={action('Modal toggled, `isOpen`')}
          onClose={action('Successfully closed an inclosable modal')}
        >
          <p>This modal cannot be closed manually.</p>
          <p>
          Provide an <code>onOpen</code> callback and set a timeout to
          close the modal by altering its <code>isOpen</code> property.
          </p>

          <p>
          This modal will be closed in {' '}
            <span className="countdown" style={{ color: '#eb5648' }}>7s</span>
            {' '} automatically.
          </p>
        </Modal>
      </FormLabel>

      <FormLabel name="Can’t close via clicking mask">
        <Modal
          openerType="switch"

          type="alert"
          title="Warning"

          canCloseOnClickMask={false}
          onToggle={action('Modal toggle, `isOpen`')}
        >
          <p>
          This modal cannot be closed through clicking mask.
          </p>

          <p>P.S. Other regular modals can.</p>
        </Modal>
      </FormLabel>

      <FormLabel name="Can’t close/confirm with key-pressing">
        <Modal
          openerType="switch"

          type="alert"
          title="Warning"

          canCloseOnEsc={false}
          canConfirmOnEnter={false}

          onToggle={action('Modal toggled, `isOpen`')}
        >
          <p>
          This modal cannot be closed via pressing <kbd>Esc</kbd> key
          and cannot be confirmed via pressing <kbd>Enter</kbd> key.
          </p>

          <p>P.S. Other regular modals can.</p>
        </Modal>
      </FormLabel>

      <h2>Form</h2>
      <NewMasterFormLabel />

      <FormLabel name="Transfer Screen(s)">
        <Modal
          opener={<Icon name="exchange" />}
          openerType="text"

          type="form"
          title="Transfer Screen(s)"
          onConfirm={action('Confirmed')}
          onCancel={action('Cancelled')}
          onToggle={action('Modal toggled, `isOpen`')}
        >
          <p style={{ margin: '0 0 1.5em' }}>转移页面「<WidgetName name="2017年末重要促销页面，禁止外流！！" />」到其他位置。</p>
          <FormLabel name="目标项目">
            <Select
              placeholder="选择一个项目"
              optionList={[
                ['我的项目', '私ノ友達', '双十一的特价活动超强報价页面，十月底最终版'],
                ['洋基队', 'InstaYankies', 'New York New York', 'Manhattan Project'],
                ['巨人队', 'Taller Men', 'Shorter Giants'],
                ['红襪队', '一个很長很長又臭又長很長很長又臭又長很長很長又臭又長又長又臭又長又臭又臭又長的项目名字'],
              ]}
            />
          </FormLabel>
        </Modal>
      </FormLabel>

      <FormLabel name="Y-position">
        <Modal
          openerType="switch"

          type="form"
          title="Demo for Modals"
          onToggle={action('Modal toggled, `isOpen`')}
        >
          <p>
          Generally, modals will be positioned at 20vh vertically.
          </p>
        </Modal>
      </FormLabel>

      <FormLabel name="Y-position for slightly-longer modals">
        <Modal
          openerType="switch"

          type="form"
          title="Demo for Slightly-longer Modals"
          className="s-long-modal"
          onToggle={action('Modal toggled, `isOpen`')}
        >
          <style>{`.s-long-modal { height: 500px; }`}</style>
          <p>
          Should the Y position of a slightly-longer modal (except alert)
          is smaller than 20vh while it’s positioned vertically-centered,
          the modal is positioned vertically-centered.
          </p>
        </Modal>
      </FormLabel>

      <FormLabel name="Y-position for long modals">
        <Modal
          openerType="switch"

          type="form"
          title="Demo for Long Modals"
          className="long-modal"
          onToggle={action('Modal toggled, `isOpen`')}
        >
          <style>{`.long-modal { height: 1200px; }`}</style>
          <p>
          Long modals except for alerts will be positioned vertically
          at 50px and there’ll be a 50px bottom margin for visual reason.
          </p>
        </Modal>
      </FormLabel>

      <h2>Functional</h2>
      <FormLabel name="Share">
        <Modal
          opener={[<Icon key="icon" name="share" />, 'Share']}
          openerType="text"

          title="Share"
          className="share-modal"

          onToggle={action('Modal toggled, `isOpen`')}
        >
          <style>
            {`.share-modal .FormEntry > .key { flex-basis: 10em; }`}
            {`.share-modal .FormEntry > .val label { width: 100%; }`}
            {`.share-modal .Textarea { width: 100%; }`}
          </style>

          <p>Embed the app in a website or blog by the code below:</p>
          <Textarea
            readOnly
            value='<iframe src="https://modao.cc/app/123/embed" width="488" height="900" allowTransparency="true" frameborder="0"></iframe>'
            onClick={() => document.querySelector('.share-modal textarea').select()}
            style={{ width: '100%', height: '5em' }}
          />

          <FormEntry name="Access">
            <RadioGroup
              optionList={[
                'Only for Collaborators',
                {
                  label: (
                    <span>
                    Anyone with the URL and optional password:
                      {' '}
                      <Input key="input" type="password" />
                    </span>
                  ),
                  value: 'pwd',
                },
              ]}
              value="pwd"
            />
          </FormEntry>

          <FormEntry name="Preview Settings">
            <CheckGroup
              optionList={[
                'Highlight clickable areas on the screens.',
                'Play the app directly without showing install instructions.',
              ]}
              valueList={['Highlight clickable areas on the screens.']}
            />
          </FormEntry>

        </Modal>
      </FormLabel>

      <h2>Display</h2>
      <FormLabel name="Shortcuts">
        <Modal
          opener={[<Icon key="icon" name="keyboard" />, 'Shortcuts']}
          openerType="text"

          type="display"
          title="Shortcuts"
          onToggle={action('Modal toggled, `isOpen`')}
        >
          <p>
          Display modals are designed to display information that
          needs larger spaces, i.e. list of shortcuts.
          </p>
        </Modal>
      </FormLabel>
    </Root>
  ))

class NewMasterFormLabel extends PureComponent {
  state = { isOpen: false }

  onToggle = isOpen => this.setState({ isOpen })

  render () {
    const { isOpen } = this.state

    return (
      <FormLabel name="Add New Master">
        <NewMasterModal isOpen={isOpen} onToggle={this.onToggle} />
      </FormLabel>
    )
  }
}

class NewMasterModal extends PureComponent {
  state = {
    name: '',
    access: 'public',
    w: 300,
    h: 50,
  }

  onChangeName = name => this.setState({ name })

  onToggleAccess = ({ value: access }) => this.setState({ access })

  onChangeW = w => this.setState({ w })

  onChangeH = h => this.setState({ h })

  render () {
    const { isOpen, onToggle } = this.props
    const { name, access, w, h } = this.state

    return (
      <Modal
        openerType="text"
        opener={<Icon name="plus" />}
        className="master-modal"

        isOpen={isOpen}

        type="form"
        title="New Master"
        onConfirm={action('Confirmed')}
        onCancel={action('Cancelled')}
        onToggle={action('Modal toggled, `isOpen`')}

        onToggle={onToggle}
      >
        <p>All modals will try to focus on the first input element once opened.</p>

        <FormLabel name="Name">
          <Input
            placeholder="Name the new master"
            value={name}
            onChange={this.onChangeName}
          />
        </FormLabel>

        <FormEntry name="Access">
          <RadioGroup
            optionList={[
              { label: 'Public', value: 'public' },
              { label: 'Private', value: 'private' },
            ]}
            value={access}
            onChange={this.onToggleAccess}
          />
        </FormEntry>

        <FormEntry name="Size">
          <style>
            {`
            .master-modal .FormEntry > .val > input.regular[type=number] {
              display: inline-block;
              width: 6em;
            }

            .master-modal .size {
              display: flex;
              align-items: baseline;
            }
            .master-modal .times {
              width: 3em;
              text-align: center;
            }
          `}
          </style>

          <div className="size">
            <InputNumber value={w} onChange={this.onChangeW} />
            <span className="times">&times;</span>
            <InputNumber value={h} onChange={this.onChangeH} />
          </div>
        </FormEntry>
      </Modal>
    )
  }
}

class ModalExample extends PureComponent {
  state = {
    isOpen: false,
  }

  onClick = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  render () {
    return (
      <>
        <button onClick={this.onClick}>弹窗</button>

        <TransitionModal className={'myModal'} isOpen={this.state.isOpen} onClose={this.close}>
        </TransitionModal>
      </>
    )
  }
}

class ModalExample2 extends PureComponent {
  state = {
    isOpen: false,
  }

  onClick = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  render () {
    return (
      <>
        <button onClick={this.onClick}>弹窗</button>

        <PureTransitionModal className={'myModal'} isOpen={this.state.isOpen} onClose={this.close}>
          <header onClick={this.close}>Im header under Modal component</header>
        </PureTransitionModal>
      </>
    )
  }
}
