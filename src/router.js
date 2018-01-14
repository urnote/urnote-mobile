import { StackNavigator } from 'react-navigation';
import Home from './containers/Home';
import Login from './containers/Login';

const stackNavigatorConfig = {
  initialRouteName: 'Home',
  headerMode: 'screen',
};

export default StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: '有记笔记',
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: '登录',
    },
  },
}, stackNavigatorConfig);
