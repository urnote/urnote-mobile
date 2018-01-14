import RNFB from 'react-native-fetch-blob';
import noop from 'lodash/noop';
import { join } from './path';
import pkg from '../../package.json';

export const types = {
  Directory: 'directory',
  File: 'file',
};

const appDir = join(RNFB.fs.dirs.DocumentDir, pkg.name);

export async function ls(path) {
  return await RNFB.fs.ls(join(appDir, path));
}

export async function mkdir(path) {
  return await RNFB.fs.mkdir(join(appDir, path)).catch(noop);
}

export async function exists(path) {
  return await RNFB.fs.exists(join(appDir, path));
}

export async function isDir(path) {
  return await RNFB.fs.isDir(join(appDir, path));
}

export async function unlink(path) {
  return await RNFB.fs.unlink(join(appDir, path)).catch(noop);
}

export async function mv(from, to) {
  return await RNFB.fs.mv(join(appDir, from), join(appDir, to));
}

export default {
  types,
  join,
  ls,
  mkdir,
  exists,
  isDir,
  unlink,
  mv,
};
