import React, {Component} from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {Image, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

class NoInternetError extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/no_internet.png')}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <Text style={{fontSize:17}}>No Internet Connection</Text>
      </View>
    );
  }
}

export default NoInternetError;
