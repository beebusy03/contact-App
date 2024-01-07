import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';

export const generateRandomColorAndInitials = (name) => {
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c',
  '#e67e22', '#3498db', '#95a5a6', '#16a085', '#d35400', '#c0392b', '#2980b9',
  '#8e44ad', '#2c3e50', '#f39c12', '#d35400', '#2c3e50', '#8e44ad', '#16a085',];
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = charCodeSum % colors.length;
  const backgroundColor = colors[index];
  const initial = name.charAt(0);

  return { backgroundColor, initial };
};

const ContactListScreen = ({ navigation, contacts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    const filtered = contacts.filter(
      (contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  const navigateToAddContact = () => {
    navigation.navigate('ContactScreen');
  };

  const navigateToUpdateContact = (contact) => {
    navigation.navigate('ContactUpdate', { contact });
  };

  const navigateToFavoriteContacts = () => {
    navigation.navigate('FavoriteContactListScreen');
  };

  const handleDeleteContact = (contact) => {
    dispatch({ type: 'REMOVE_CONTACT', payload: { id: contact.id } });
  };

  const generateRandomColor = (name) => {
    const colors = [
      '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c',
      '#e67e22', '#3498db', '#95a5a6', '#16a085', '#d35400', '#c0392b', '#2980b9',
      '#8e44ad', '#2c3e50', '#f39c12', '#d35400', '#2c3e50', '#8e44ad', '#16a085',
    ];

    const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = charCodeSum % colors.length;
    return colors[index];
  };

  const renderItem = (data) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigateToUpdateContact(data.item)}
    >
      <View style={styles.contactInfoContainer}>
        {data.item.avatar && data.item.avatar.uri ? (
          <Image source={{ uri: data.item.avatar.uri }} style={styles.avatar} />
        ) : (
          <View style={[styles.initialContainer, { backgroundColor: generateRandomColor(data.item.name) }]}>
            <Text style={styles.initialText}>{data.item.name.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.contactName}>{data.item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  
  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, { backgroundColor: 'green' }]}
        onPress={() => navigateToUpdateContact(data.item)}
      >
        <Icon name="pencil" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, { backgroundColor: 'red' }]}
        onPress={() => handleDeleteContact(data.item)}
      >
        <Icon name="trash" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact List</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <SwipeListView
        data={filteredContacts.sort((a, b) => a.name.localeCompare(b.name))}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={navigateToAddContact}
        activeOpacity={0.7}
      >
        <View style={styles.buttonContainer}>
          <Icon name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={navigateToFavoriteContacts}
      >
        <Icon name="heart" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightyellow',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
  contactItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'yellow',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  buttonContainer: {
    backgroundColor: 'darkblue',
    padding: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  initialContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    borderRadius: 8,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.contacts,
  };
};

export default connect(mapStateToProps)(ContactListScreen);
