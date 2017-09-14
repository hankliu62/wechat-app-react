function InputChange(WrappedComponent) {
  WrappedComponent.prototype.onChangeInput = function (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
}


export default InputChange;
