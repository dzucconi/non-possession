import qs from 'qs';
import defaults from 'lodash.defaults';

const type = v => {
  switch (true) {
  case +v == v: // Number
    return +v;
  case v === 'true': // Boolean `true`
    return true;
  case v === 'false': // Boolean `false`
    return false;
  case v === 'null': // `null`
    return null;
  default:
    return v;
  }
};

const transform = (obj, fn) =>
  Object.keys(obj).reduce((memo, key) => {
    memo[key] = fn(obj[key]);
    return memo;
  }, {});

const coerce = obj => transform(obj, type);

export default obj => {
  const params = coerce(qs.parse(location.search.slice(1)));
  return defaults({}, params, obj);
};
