import React, {Component} from 'react';
import {TextInput, Button, Card, Title} from 'react-native-paper';
import {View, Text, FlatList, Image, AppState} from 'react-native';

class WeatherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: {
        name: 'loading !!',
        country: 'loading',
        temp: 'loading',
        humidity: 'loading',
        desc: 'loading',
        icon: 'loading',
      },
    };

    this._getWeatherInfo = this._getWeatherInfo.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }
  _getWeatherInfo = async () => {
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
      })
      .catch((err) => {
        alert(
          'Something went wrong behind the scence. Might be you you miss-spelled the city name or the weather record of the entered city does not exist. Please change the city name in the Settings.',
        );
      });
  };

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this._getWeatherInfo();
    }
  };

  componentDidMount() {
    this.focusListener = this.props.navigator.addListener('focus', () => {
      this._getWeatherInfo();
    });

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    return (
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
    );
  }
}

export default WeatherInfo;
