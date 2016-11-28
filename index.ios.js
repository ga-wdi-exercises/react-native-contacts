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

// Row component
const Row = props => {
  let {imageUrl, firstName, lastName } = props.contact
  let name = `${firstName} ${lastName}`
  return (
    <View style={styles.rowContainer}>
      <Image style={styles.rowPhoto} source={{uri: imageUrl}} />
      <Text style={styles.rowText}>{name}</Text>
    </View>
  )
}

// ContactList component
class ContactList extends Component {
  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={data => <Row contact={data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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

// App Styles
const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    marginLeft: 12,
    fontSize: 16,
  },
  rowPhoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
})

AppRegistry.registerComponent('ContactApp', () => ContactApp);
