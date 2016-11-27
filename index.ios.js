import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} from 'react-native';

// import seed data
import contactsData from './contactsData'

// ContactList component
class ContactList extends Component {
  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={data => <Text>{data.firstName}</Text>}
        />
    )
  }
}

// ContactApp component
export default class ContactApp extends Component {
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      contacts: contactsData,
      dataSource: ds.cloneWithRows(contactsData),
      searchTerm: '',
    }
  }

  render() {
    return (
      <View>
        <ContactList
          dataSource={this.state.dataSource} />
      </View>
    )
  }
}

AppRegistry.registerComponent('ContactApp', () => ContactApp);
