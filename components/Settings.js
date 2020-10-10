import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Header from './Header';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const Settings = () => {
  const [city, setCity] = useState();
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const asyncFunctionData = async () => {
      try {
        const storageData = await AsyncStorage.getItem('city');
        setCity(storageData);
      } catch (e) {
        alert(e);
      }
    };
    asyncFunctionData();
  }, []);

  const btnClick = async () => {
    try {
      await AsyncStorage.setItem('city', city);
      alert('City is saved successfully!');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View>
      <Header />
      <View style={{margin: 20}}>
        <TextInput
          label="Enter City Name"
          value={city}
          onChangeText={(city) => setCity(city)}
        />
        <Button icon="content-save" mode="contained" onPress={() => btnClick()}>
          Save Changes
        </Button>
      </View>
    </View>
  );
};

export default Settings;
