import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Icon name={'plus'} color={'#000000'} size={35} />
      </View>
    );
  }
}