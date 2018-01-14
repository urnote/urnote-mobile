import compact from 'lodash/compact';

export function join(...args) {
  return compact(args).join('/');
}

export function extname(path) {
  const lastDotIndex = path.lastIndexOf('.');

  return lastDotIndex !== -1 ? path.substr(lastDotIndex) : '';
}

export default {
  join,
  extname,
};
