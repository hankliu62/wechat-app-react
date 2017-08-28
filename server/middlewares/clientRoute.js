import { matchPath } from 'react-router';

async function clientRoute (req, res, next) {

  var match = matchPath(req.pathname, routes);

  if (match) {
    await res.render('index');
  } else {
    await next();
  }

}

export default clientRoute;
