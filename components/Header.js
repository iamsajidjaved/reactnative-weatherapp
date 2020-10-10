import * as React from 'react';
import {Text} from 'react-native';
import {Appbar, Title} from 'react-native-paper';
import {displayName} from '../app.json';
const Header = () => {
  return (
    <Appbar.Header style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Title style={{color: 'white'}}>{displayName}</Title>
    </Appbar.Header>
  );
};

export default Header;
