function CheckRoute(WrappedComponent) {
  WrappedComponent.prototype.checkIsSubRoute = function () {
    return this.props.location.pathname !== this.props.match.path;
  };
}


export default CheckRoute;
