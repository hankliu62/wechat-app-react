import isEmpty from 'lodash/isEmpty';

function CheckRoute(WrappedComponent) {
  WrappedComponent.prototype.checkIsSubRoute = function () {
    return this.props.location.pathname !== this.props.match.path;
  };

  WrappedComponent.prototype.checkHasRouteParams = function () {
    return !isEmpty(this.props.match.params);
  };
}


export default CheckRoute;
