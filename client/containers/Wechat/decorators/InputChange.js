function InputChange(WrappedComponent) {
  WrappedComponent.prototype.handleChangeInput = function (e) {
    const name = e.target.name;
    const value = e.target.value;
    if (this.props.onChangeValue) {
      this.props.onChangeValue(value, e);
    }
    this.setState({ [name]: value });
  };
}


export default InputChange;
