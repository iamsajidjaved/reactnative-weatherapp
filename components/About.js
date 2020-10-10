import * as React from 'react';
import {Text, View} from 'react-native';
import Header from './Header';
import {Card, Title, Paragraph} from 'react-native-paper';

const About = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <Card style={{margin:0, flex: 1}}>
        <Card.Content>
          <Title>About the Developer</Title>
          <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default About;
