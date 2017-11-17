import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '@ibot/icon'
import { trimList } from '@ibot/util'

/**
 * <Check>
 */
export class Check extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isChecked: props.isChecked }
  }

  static propTypes = {
    isChecked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.any,
    className: PropTypes.string,
  }

  static defaultProps = {
    isChecked: false,
    label: '',
    className: '',
    onChange: () => null,
  }

  componentWillReceiveProps({ isChecked: willBeChecked }) {
    const { isChecked } = this.props

    if (willBeChecked !== isChecked) {
      this.setState({ isChecked: willBeChecked })
    }
  }

  onToggle = () => this.setState(
    { isChecked: !this.state.isChecked },
    () => this.props.onChange(this.state.isChecked),
  )

  render() {
    const { className, label, name, isDisabled } = this.props
    const { isChecked } = this.state

    return (
      <label
        className={trimList([
          'Check',
          className,
          isChecked ? 'is-checked' : '',
          isDisabled ? 'is-disabled' : '',
        ])}
      >
        <input
          type="checkbox"
          defaultChecked={isChecked}
          disabled={isDisabled}
          name={name}
          onChange={this.onToggle}
        />
        <span className="CheckState"><Icon type="md" name="check" /></span>
        <span className="CheckLabel">{ label }</span>
      </label>
    )
  }
}

/**
 * <CheckGroup>
 */
export class CheckGroup extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    optionList: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          label: PropTypes.any,
          value: PropTypes.any,
          isDisabled: PropTypes.bool,
        }),
      ])
    ).isRequired,
    currentOptionIdxList: PropTypes.oneOfType([
      PropTypes.instanceOf(Set),
      PropTypes.array,
    ]),
    isDisabled: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    optionList: [],
    currentOptionIdxList: new Set(),
    onChange: () => null,
    isDisabled: false,
  }

  createOnChangeHandler = idx => () => {
    const { onChange, currentOptionIdxList } = this.props
    const result = new Set(currentOptionIdxList)
    const action = result.has(idx) ? 'delete' : 'add'

    result[action](idx)
    onChange(result)
  }

  render() {
    const {
      className,
      optionList, currentOptionIdxList,
      isDisabled,
    } = this.props

    const currentOptionIdxSet = new Set(currentOptionIdxList)

    const klass = trimList([
      'CheckGroup',
      className,
      isDisabled ? 'is-disabled' : '',
    ])

    return (
      <span className={klass}>
      {
        optionList.map((opt, idx) => opt && (
          <Check
            key={idx}
            onClick={this.createOnChangeHandler(idx)}
            isDisabled={isDisabled || opt.isDisabled}
            isChecked={currentOptionIdxSet.has(idx)}
            label={typeof opt === 'string' ? opt : opt.label}
          />
        ))
      }
      </span>
    )
  }
}
