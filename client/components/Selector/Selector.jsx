import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

class Selector extends Component {
  static propTypes = {
    labelField: PropTypes.string,
    valueField: PropTypes.string,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    placeholder: PropTypes.string,
    filterable: PropTypes.bool,
    tooltipable: PropTypes.bool,
    uncheckable: PropTypes.bool,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    filterable: false,
    tooltipable: false,
    uncheckable: false,
    labelField: 'text',
    valueField: 'value'
  }

  constructor(props) {
    super(props);

    const { value, labelField, valueField, options = [] } = props;
    const selectedOption = options.find(option => option[valueField] === value);

    this.state = {
      isShowDropdown: false,
      search: '',
      selectedOptionLabel: selectedOption ? selectedOption[labelField] : ''
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickDocument, false);
  }

  componentWillReceiveProps(nextProps) {
    const { value, labelField, valueField, options = [] } = nextProps;
    if (this.props.value !== value) {
      const selectedOption = options.find(option => option[valueField] === value);

      this.setState({ selectedOptionLabel: selectedOption ? selectedOption[labelField] : '' });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickDocument, false);
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleToggleDropdown = (event) => {
    if (event) {
      event.stopPropagation();
    }

    if (this.props.disabled) {
      return;
    }

    this.setState(prevState => ({
      isShowDropdown: !prevState.isShowDropdown
    }));
  }

  handleSelectItem = (val) => {
    let nextValue = val;

    if (this.props.value === val && this.props.uncheckable) {
      nextValue = '';
    }

    if (this.props.value !== nextValue && this.props.onChange) {
      this.props.onChange(nextValue);
    }
    this.handleToggleDropdown();
  }

  handleClickDocument = () => {
    if (!this.isChildOf(event.target, this.selector) && this.state.isShowDropdown) {
      this.setState({ isShowDropdown: false });
    }
  }

  isChildOf(child, parent) {
    if (child.parentNode === parent) {
      return true;
    }

    if (child.parentNode === null) {
      return false;
    }

    return this.isChildOf(child.parentNode, parent);
  }

  matchSearch = (name) => {
    const q = this.state.search.trim();
    if (q === '') {
      return true;
    }
    if (name.indexOf(q) >= 0) {
      return true;
    }
    return false;
  }

  render() {
    const { labelField, valueField, disabled, filterable, tooltipable, placeholder, className } = this.props;
    let { options } = this.props;
    const { selectedOptionLabel, isShowDropdown, search } = this.state;

    if (filterable && !!search) {
      options = options.filter(option => this.matchSearch(option[labelField]));
    }

    return (
      <div className={classNames('hk-selector', { [className]: className, disabled, focus: isShowDropdown, 'placeholder-status': !selectedOptionLabel })} ref={el => this.selector = el}>
        <div className="hk-selector-source" onClick={this.handleToggleDropdown}>
          <div
            className="hk-selector-source-control"
            data-for="source"
          >
            { selectedOptionLabel || placeholder }
          </div>
          <i className={classNames('icon-triangle-down', { up: isShowDropdown })} />
        </div>
        { tooltipable && <ReactTooltip id="source" place="bottom" type="dark" effect="solid" getContent={() => selectedOptionLabel || ''} /> }
        {
          isShowDropdown &&
            <div className="hk-dropdown-wrapper">
              <div className="hk-dropdown-box">
                {
                  filterable &&
                    <input className="hk-dropdown-filter-input u-ipt-box" name="search" type="text" value={search} onChange={this.handleInputChange} />
                }
                <div className="hk-dropdown-list">
                  <ul>
                    {
                      options.map(option => (
                        <li
                          className={classNames('hk-dropdown-item', {
                            selected: this.props.value === option[valueField]
                          })}
                          key={option[valueField]}
                          onClick={() => this.handleSelectItem(option[valueField])}
                          data-for="option"
                          data-tip={option[labelField]}
                        >
                          { option[labelField]}
                        </li>
                      ))
                    }
                  </ul>
                  { tooltipable && <ReactTooltip id="option" place="bottom" type="dark" effect="solid" /> }
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default Selector;
