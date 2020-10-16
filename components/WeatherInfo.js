import React, {Component} from 'react';
import {
  TextInput,
  Button,
  Card,
  Title,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import {View, Text, FlatList, Image, AppState, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

class WeatherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: {
        name: '',
        country: '',
        temp: '',
        humidity: '',
        desc: '',
        icon: '',
      },
      isResponseReceived: false,
    };

    this._getWeatherInfo = this._getWeatherInfo.bind(this);
  }
  _getWeatherInfo = async () => {
    this.setState({isResponseReceived: false});
    try {
      var city = await AsyncStorage.getItem('city');
      if (city === undefined || city === null) {
        city = 'islamabad';
      }
    } catch (e) {
      city = 'islamabad';
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8c2b5cc360b1f68382afc4899d6dec03&units=metric`,
    )
      .then((data) => data.json())
      .then((results) => {
        this.setState((prevState) => ({
          weatherInfo: {
            ...prevState.weatherInfo,
            name: results.name,
            country: results.sys.country,
            temp: results.main.temp,
            humidity: results.main.humidity,
            desc: results.weather[0].description,
            icon: results.weather[0].icon,
          },
        }));

        this.setState({isResponseReceived: true});
      })
      .catch((err) => {
        if (
          err.message == 'Timeout' ||
          err.message == 'Network request failed'
        ) {
          // some code
        } else {
          alert('Unhandled Error');
        }

        this.setState({isResponseReceived: true});
      });
  };

  componentDidMount() {
    this.focusListener = this.props.navigator.addListener('focus', () => {
      this._getWeatherInfo();
    });

    this._getWeatherInfo();
  }

  render() {
    return (
      <View>
        {this.state.isResponseReceived == false ? (
          <Spinner
            visible={true}
            textContent={'Loading ...'}
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <View>
            <View style={{alignItems: 'center'}}>
              <Title
                style={{
                  color: '#00aaff',
                  marginTop: 30,
                  fontSize: 30,
                }}>
                {this.state.weatherInfo.name}
              </Title>
              <Text style={{color: '#00aaff', fontSize: 20}}>
                ({this.state.weatherInfo.country})
              </Text>
              <Image
                style={{
                  width: 120,
                  height: 120,
                }}
                source={{
                  uri:
                    'https://openweathermap.org/img/w/' +
                    this.state.weatherInfo.icon +
                    '.png',
                }}
              />
            </View>

            <Card
              style={{
                margin: 5,
                padding: 12,
              }}>
              <Title style={{color: '#00aaff'}}>
                Temperature - {this.state.weatherInfo.temp}
              </Title>
            </Card>
            <Card
              style={{
                margin: 5,
                padding: 12,
              }}>
              <Title style={{color: '#00aaff'}}>
                Humidity - {this.state.weatherInfo.humidity}
              </Title>
            </Card>
            <Card
              style={{
                margin: 5,
                padding: 12,
              }}>
              <Title style={{color: '#00aaff'}}>
                Description- {this.state.weatherInfo.desc}
              </Title>
            </Card>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#fff',
  },
});

export default WeatherInfo;
