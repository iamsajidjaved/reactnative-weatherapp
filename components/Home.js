import React, {useState, useEffect, Component} from 'react';
import {TextInput, Button, Card, Title} from 'react-native-paper';
import {View, Text, FlatList, Image} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import WeatherInfo from './WeatherInfo';
import NoInternetError from './NoInternetError';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: false,
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      NetInfo.fetch().then((state) => {
        this.setState({isInternetConnected: state.isConnected});
      });
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header name="Weather App" />
        {this.state.isInternetConnected ? (
          <WeatherInfo navigator={this.props.navigation} />
        ) : (
          <NoInternetError/>
        )}
      </View>
    );
  }
}
