import React, {Component} from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {Image, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

class UnHandledError extends Component {
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
        <Text style={{fontSize:17}}>Unhandled Error</Text>
      </View>
    );
  }
}

export default UnHandledError;
