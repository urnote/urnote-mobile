import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';
import {
  action,
  observable,
  toJS,
} from 'mobx';
import {
  inject,
  observer,
} from 'mobx-react';
import config from '../support/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderTopWidth: .5,
    borderBottomWidth: .5,
  },
  field: {
    flexDirection: 'row',
    height: 40,
    borderColor: 'lightgray',
  },
  labelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  input: {
    width: '100%',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  }
});

@inject('urnote') @observer class Login extends Component {
  static propTypes = {
    urnote: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  @observable data = {
    username: '',
    password: '',
  };
  @observable error = '';

  @action.bound onTextFocus() {
    this.error = '';
  }

  @action onTextChange(text, field) {
    this.data[field] = text.trim();
  }

  @action.bound onSubmit() {
    const { urnote, navigation } = this.props;
    const data = toJS(this.data);

    urnote.configWebDAV(data).then(() => {
      config.save(data, config.types.UserData).then(() => {
        navigation.navigate('Home');
      });
    }).catch((error) => this.error = error.message);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={[styles.field, {borderBottomWidth: .5}]}>
            <View style={styles.labelContainer}>
              <Text>账号：</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="example@qq.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                style={styles.input}
                value={this.data.username}
                onFocus={this.onTextFocus}
                onChangeText={(text) => this.onTextChange(text, 'username')}
              />
            </View>
          </View>
          <View style={styles.field}>
            <View style={styles.labelContainer}>
              <Text>密码：</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                value={this.data.password}
                onFocus={this.onTextFocus}
                onChangeText={(text) => this.onTextChange(text, 'password')}
              />
            </View>
          </View>
        </View>
        <Button title="登录" onPress={this.onSubmit} />
        <Text style={styles.error}>{this.error}</Text>
      </View>
    );
  }
}

export default Login;
