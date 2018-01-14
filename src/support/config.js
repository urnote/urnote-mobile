import { AsyncStorage } from 'react-native';
import merge from 'lodash/merge';
import pkg from '../../package.json';

const toStorageName = (...args) => [pkg.name].concat(args).join(':');

export const types = {
  AppData: toStorageName(pkg.version),
  UserData: toStorageName('UserData'),
  StateData: toStorageName('StateData'),
};

export async function get(type = types.AppData) {
  try {
    const config = await AsyncStorage.getItem(type);

    return JSON.parse(config);
  } catch (err) {
    console.error('Error reading persisted application storage', err);

    return null;
  }
}

export async function save(config, type = types.AppData) {
  try {
    const oldConfig = await get(type);
    
    await AsyncStorage.setItem(
      type,
      JSON.stringify(oldConfig ? merge(oldConfig, config) : config)
    );

    return true;
  } catch (err) {
    console.error('Error persisting application storage', err);

    return false;
  }
}

export async function clear() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);

    return true;
  } catch (err) {
    console.error('Error clearing persisted application storage', err);
    
    return false;
  }
}

export default {
  types,
  get,
  save,
  clear,
};
