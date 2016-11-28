import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TextInput
} from 'react-native';

// import seed data
import contactsData from './contactsData'

// ContactSearch component
const ContactSearch = props => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.input}
      placeholder="Search..."
      value={props.searchTerm}
      onChangeText={text => props.onSearchInput(text) } />
  </View>
)

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
        renderHeader={() => (
          <ContactSearch
            searchTerm={this.props.searchTerm}
            onSearchInput={this.props.onSearchInput} />
        )}
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

    // bind methods to instance
    this.handleSearchInput = this.handleSearchInput.bind(this)
  }

  handleSearchInput(searchTerm) {
    let filterbyFullName = contact => {
      let fullName = `${contact.firstName} ${contact.lastName}`
      return fullName.includes(searchTerm.toLowerCase())
    }

    let updatedContacts = this.state.contacts.slice().filter(filterbyFullName)
    updatedContacts = updatedContacts.length ? updatedContacts : this.state.contacts.slice()

    this.setState({
      ...this.state,
      dataSource: this.state.dataSource.cloneWithRows(updatedContacts),
      searchTerm,
    })
  }

  render() {
    return (
      <View style={{top: 18}}>
        <ContactList
          dataSource={this.state.dataSource}
          onSearchInput={this.handleSearchInput}
          searchTerm={this.state.searchTerm}
        />
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
  },
  searchContainer: {
   flex: 1,
   padding: 8,
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#C1C1C1',
 },
 input: {
   height: 30,
   flex: 1,
   paddingHorizontal: 8,
   fontSize: 15,
   backgroundColor: '#FFFFFF',
   borderRadius: 2,
 },
})

AppRegistry.registerComponent('ContactApp', () => ContactApp);
