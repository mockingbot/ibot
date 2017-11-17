import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../packages/root/index'
import Icon from '../packages/icon/index'
import Switch from '../packages/switch/index'
import Modal from '../packages/modal/index'

import {
  FormLabel, FormEntry,
  Input, Textarea,
  Radio, Check,
  RadioGroup, CheckGroup,
  Select,
} from '../packages/form/index'

import { WidgetName } from '../packages/text/index'

storiesOf('Modal', module)
.add('Default', () => (
  <Root>
    <Modal isOpen={true} />
  </Root>
))
.add('Openers', () => (
  <Root>
    <p>
      <Modal
        openerType="switch"

        isOpen={true}
        title="Modal’s Title"
      >
        Modal opened with <Switch />
      </Modal>
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
      >
        Modal opened with a button
      </Modal>

      <Modal
        opener="Open a Modal"
        openerType="regular"

        isOpen={false}
        title="Modal’s Title"
      >
        Modal opened with a button
      </Modal>

      <Modal
        opener="Open a Modal"
        openerType="text"

        isOpen={false}
        title="Modal’s Title"
      >
        Modal opened with a button
      </Modal>

      <Modal
        isOpen={false}
        opener={[<Icon key="icon" name="share" />, 'Open a Modal']}
        openerType="text"
        title="Modal’s Title"
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
      >
        Give me an alert:{' '}
        <Modal openerType="switch" type="alert" title="Yay!">
          Modal in a modal is open!
        </Modal>
      </Modal>
    </p>
  </Root>
))
.add('Advanced', () => (
  <Root>
    <style>
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

        onConfirm={() => alert('You confirmed!')}
        confirmText="Try Me!"

        onCancel={() => alert('You cancelled!')}
        cancelText="Nope!"
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

        onConfirm={() => alert('You confirmed!')}
        onCancel={() => alert('You cancelled!')}
        shouldCloseOnAction={false}
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
                 * **NOTE** Removing the `is-open` class is not a good way to
                 * close a modal, you should instead alter the `isOpen` property
                 * of the component in its stateful parent for such purpose.
                 */
                $portal.classList.remove('is-open')
              }
            } catch (e) {
              clearInterval(window.ccm_interval)
            }
          }, 1000)
        })}
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
      >
        <p>
          This modal cannot be closed via pressing <kbd>Esc</kbd> key
          and cannot be confirmed via pressing <kbd>Enter</kbd> key.
        </p>

        <p>P.S. Other regular modals can.</p>
      </Modal>
    </FormLabel>


    <h2>Form</h2>
    <FormLabel name="Add New Master">
      <Modal
        openerType="text"
        opener={<Icon name="plus" />}
        className="master-modal"

        type="form"
        title="New Master"
        onConfirm={action('submit form')}
      >
        <p>All modals will try to focus on the first input element once opened.</p>

        <FormLabel name="Name">
          <Input placeholder="Name the new master" />
        </FormLabel>

        <FormEntry name="Access">
          <RadioGroup
            optionList={[
              { label: 'Public', value: false },
              { label: 'Private', value: true },
            ]}
            currentOptionIdx={1}
          />
        </FormEntry>

        <FormLabel name="Size">
          <style>
          {`
            .master-modal .FormEntry > .val > input.regular[type=number] {
              display: inline-block;
              width: 6em;
            }
          `}
          </style>

          <Input type="number" defaultValue={300} />
          &nbsp;&times;&nbsp;
          <Input type="number" defaultValue={50} />
        </FormLabel>
      </Modal>
    </FormLabel>

    <FormLabel name="Transfer Screen(s)">
      <Modal
        opener={<Icon name="exchange" />}
        openerType="text"

        type="form"
        title="Transfer Screen(s)"
        onConfirm={() => null}
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
      >
        <style>
        {`.share-modal .FormEntry > .key { flex-basis: 10em; }`}
        {`.share-modal .FormEntry > .val label { width: 100%; }`}
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
              { label: [
                'Anyone with the URL and optional password:',
                <Input key="input" type="password" />,
              ]}
            ]}
            currentOptionIdx={1}
          />
        </FormEntry>

        <FormEntry name="Preview Settings">
          <CheckGroup
            optionList={[
              'Highlight clickable areas on the screens.',
              'Play the app directly without showing install instructions.',
            ]}
            currentOptionIdxList={[0]}
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
      >
        <p>
          Display modals are designed to display information that
          needs larger spaces, i.e. list of shortcuts.
        </p>
      </Modal>
    </FormLabel>
 </Root>
))
