import React, {useState, useEffect, Component} from 'react';
import {TextInput, Button, Card, Title} from 'react-native-paper';
import {View, Text, FlatList, Image} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'loading !!',
      country: 'loading',
      temp: 'loading',
      humidity: 'loading',
      desc: 'loading',
      icon: 'loading',
    };

    this.getWeather = this.getWeather.bind(this);
  }

  getWeather = async () => {
    try {
      var city = await AsyncStorage.getItem('city');
    } catch (e) {
      city = 'Islamabad';
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8c2b5cc360b1f68382afc4899d6dec03&units=metric`,
    )
      .then((data) => data.json())
      .then((results) => {
        console.log(results);
        this.setState({
          name: results.name,
          country: results.sys.country,
          temp: results.main.temp,
          humidity: results.main.humidity,
          desc: results.weather[0].description,
          icon: results.weather[0].icon,
        });
      })
      .catch((err) => {
        alert('Something went wrong behind the scence. Might be you you miss-spelled the city name or the weather record of the entered city does not exist. Please change the city name in the Settings.');
      });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getWeather();
    });
    this.getWeather();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header name="Weather App" />
        <View style={{alignItems: 'center'}}>
          <Title
            style={{
              color: '#00aaff',
              marginTop: 30,
              fontSize: 30,
            }}>
            {this.state.name}
          </Title>
          <Text style={{color: '#00aaff', fontSize: 20}}>
            ({this.state.country})
          </Text>
          <Image
            style={{
              width: 120,
              height: 120,
            }}
            source={{
              uri:
                'https://openweathermap.org/img/w/' + this.state.icon + '.png',
            }}
          />
        </View>

        <Card
          style={{
            margin: 5,
            padding: 12,
          }}>
          <Title style={{color: '#00aaff'}}>
            Temperature - {this.state.temp}
          </Title>
        </Card>
        <Card
          style={{
            margin: 5,
            padding: 12,
          }}>
          <Title style={{color: '#00aaff'}}>
            Humidity - {this.state.humidity}
          </Title>
        </Card>
        <Card
          style={{
            margin: 5,
            padding: 12,
          }}>
          <Title style={{color: '#00aaff'}}>
            Description- {this.state.desc}
          </Title>
        </Card>
      </View>
    );
  }
}
