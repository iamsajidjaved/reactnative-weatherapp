import * as React from 'react';
import {Text, View, Linking} from 'react-native';
import Header from './Header';
import {Card, Title, Paragraph} from 'react-native-paper';

const About = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <Card style={{margin: 0, flex: 1}}>
        <Card.Content>
          <Title>About the Developer</Title>
          <Paragraph>
            This Application is built by Sajid Javed. He's a Senior Mobile and
            Web Developer. Currently, Working in Merqata DMCC as a Senior Web
            Developer and Team Lead.
          </Paragraph>

          <Paragraph>
            If you want to know more about Sajid Javed then please visit:{' '}
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('http://sajidjaved.com/')}>
              http://sajidjaved.com/
            </Text>
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default About;
