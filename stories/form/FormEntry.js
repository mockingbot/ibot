import React, { PureComponent } from 'react'
import { action } from '@storybook/addon-actions'

import {
  Root, Icon, Switch,
  Button,
  FormLabel, FormEntry,
  Input, PanelInput, Textarea, PanelTextarea, InputNumber,
  Check,
  RadioGroup, CheckGroup,
  Select,
} from '../../components'

export default class FormEntryExample extends PureComponent {
  state = {
    isSmall: false,
    isCore: false,
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })
  toggleCore = () => this.setState({ isCore: !this.state.isCore })

  render() {
    const { isSmall, isCore } = this.state

    const size = isSmall ? 'small' : 'regular'
    const theme = isCore ? 'core' : 'plain'

    return (
      <Root>
        <style scoped>
        {`
          form { width: 25em; }
          .language-list label { flex: 100%; }

          .Select > button .icon,
          .select-menu-with-icons .icon {
            margin-right: .25em;
            font-size: 1.2em;
            vertical-align: -.1em;
          }
        `}
        </style>

        <div
          style={{
            position: 'fixed',
            top: '1em',
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

          <Button
            type="primary"
            onClick={this.toggleSize}
          >
            Toggle Size
          </Button>
        </div>

        <h2>Form Labels/Entries</h2>
        <form>
          <FormLabel name="Name" isRequired={true}>
            <Input {...{ size, theme }} placeholder="Tell us who you are…" />
          </FormLabel>

          <FormEntry name="Gender">
            <RadioGroup
              {...{ size, theme }}
              optionList={[
                { label: 'Male', value: 'M' },
                { label: 'Female', value: 'F' },
                { label: 'Other', value: 'O' },
              ]}
              value="O"
            />
          </FormEntry>

          <FormLabel name="Email" isRequired={true}>
            <Input {...{ size, theme }} type="email" defaultValue="who@am.i" />
          </FormLabel>

          <FormLabel name="ID">
            <Input {...{ size, theme }} readOnly defaultValue="@necolas" />
          </FormLabel>

          <FormLabel name="Data">
            <Switch size={size} isChecked={true} />
          </FormLabel>

          <FormLabel name="Bio">
            <Textarea {...{ size, theme }} disabled placeholder="Verify your email to modify your bio." />
          </FormLabel>

          <FormLabel name="Address">
            <Textarea {...{ size, theme }} defaultValue={
`1600 Pennsylvania Ave. NW
Washington DC 20006
USA`
            }>
            </Textarea>
          </FormLabel>

          <FormLabel name="Continent">
            <Select
              {...{ size, theme }}
              menuClassName="select-menu-with-icons"
              optionList={[
                { value: 'asia', label: <span><Icon name="room_service" type="md" /> Asia</span> },
                { value: 'africa', label: <span><Icon name="golf_course" type="md" /> Africa</span> },
                { value: 'north-america', label: <span><Icon name="kitchen" type="md" /> North America</span> },
                { value: 'south-america', label: <span><Icon name="beach_access" type="md" /> South America</span> },
                { value: 'antarctica', label: <span><Icon name="ac_unit" type="md" /> Antarctica</span> },
                { value: 'europe', label: <span><Icon name="spa" type="md" /> Europe</span> },
                { value: 'oceania', label: <span><Icon name="child_care" type="md" /> Oceania</span> },
              ]}
            />
          </FormLabel>
          <FormEntry name="Planet">
            <RadioGroup
              {...{ size, theme }}
              optionList={[
                { label: 'Earth' },
                { label: 'The other 7' },
                { label: 'Not in Solar System' },
              ]}
              value="Not in Solar System"
            />
          </FormEntry>

          <FormLabel name="Newsletter">
            <Check
              {...{ size, theme }}
              isChecked={true}
              label="I would like to receive newsletters from MockingBot in the future."
            />
          </FormLabel>

          <FormEntry name="Languages">
            <CheckGroup
              {...{ size, theme }}
              className="language-list"
              optionList={[
                { label: 'JavaScript' },
                { label: 'Ruby on Rails' },
                { label: 'Python' },
                { label: 'C/C++/C♯/Objective C' },
                { label: 'Go' },
                { label: 'Node.js' },
                { label: 'Perl' },
                { label: '珍珠語言（PerlYuYan）' },
              ]}
              valueList={['JavaScript', 'Ruby on Rails', 'Node.js']}
            />
          </FormEntry>
        </form>
      </Root>
    )
  }
}
