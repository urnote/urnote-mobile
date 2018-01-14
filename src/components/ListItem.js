import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  action,
  toJS,
} from 'mobx';
import {
  observer,
  inject,
} from 'mobx-react';
import fs from '../support/fs';
import path from '../support/path';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderColor: 'lightgray',
    borderBottomWidth: .5,
  },
});

@inject('urnote') @observer class ListItem extends Component {
  static propTypes = {
    urnote: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  getIconName() {
    const { type, name } = this.props.data;

    if (type === fs.types.Directory) {
      return 'folder-o';
    }
    switch (path.extname(name)) {
      case '.md', '.txt':
        return 'file-text-o';
      default:
        return 'file-o';
    }
  }

  render() {
    const { data, onPress } = this.props;

    return (
      <TouchableHighlight underlayColor="#eee" onPress={onPress}>
        <View style={styles.container}>
          <Icon name={this.getIconName(data.type)} size={20} />
          <Text>{'  ' + data.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ListItem;
