import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ContactApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      contacts: [],
      searchTerm: '',
    }
  }

  render() {
    return (
      <View>
        <ContactList />
      </View>
    )
  }
}

AppRegistry.registerComponent('ContactApp', () => ContactApp);
