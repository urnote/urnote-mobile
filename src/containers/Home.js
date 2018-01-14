import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
} from 'react-native';
import {
  observable,
  action,
  toJS,
} from 'mobx';
import {
  observer,
  inject,
} from 'mobx-react';
import fs from '../support/fs';
import config from '../support/config';
import ListItem from '../components/ListItem';

const styles = StyleSheet.create({
  tipContainer: {
    marginTop: '30%',
  },
  tipText: {
    color: 'gray',
    textAlign: 'center',
  },
  list: {
    height: '100%',
    backgroundColor: 'white',
  },
});

@inject('urnote') @observer class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  @observable docs = [];
  @observable online = false;

  @action.bound onLogin() {
    const { navigation } = this.props;

    navigation.navigate('Login');
  }

  @action.bound onItemPress(item) {
  
  }

  async componentWillMount() {
    const { urnote } = this.props;
    const userData = await config.get(config.types.UserData);

    if (userData) {
      urnote.configWebDAV(userData);
      this.online = true;
    }
    fs.ls().then((docs) => {
      const items = docs.map(async (doc, key) => {
        const isDir = await fs.isDir(doc);

        return {
          key,
          name: doc,
          type: isDir ? fs.types.Directory : fs.types.File,
        };
      });

      Promise.all(items).then((result) => this.docs = result);
    });
  }

  render() {
    const { urnote } = this.props;
    const docs = (
      <FlatList
        style={styles.list}
        data={toJS(this.docs)}
        renderItem={({item}) => (
          <ListItem data={item} onPress={this.onItemPress}/>
        )}
      />
    );
    const tips = (
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>还没登录？赶紧去登录吧</Text>
        <Button title="立即登录" onPress={this.onLogin} />
      </View>
    );

    return <View>{this.online ? docs : tips }</View>;
  }
}

export default Home;
