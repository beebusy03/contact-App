import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const CustomDropdown = ({ isVisible, navigateToContactList, navigateToFavoriteContactList, closeDropdown }) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeDropdown}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPressOut={closeDropdown}
      >
        <View style={styles.dropdownContainer}>
          <TouchableOpacity onPress={navigateToContactList} style={styles.dropdownItem}>
            <Icon name="address-book" size={20} color="#3498db" style={styles.dropdownIcon} />
            <Text style={styles.dropdownText}>Contact List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToFavoriteContactList} style={styles.dropdownItem}>
            <Icon name="star" size={20} color="#e74c3c" style={styles.dropdownIcon} />
            <Text style={styles.dropdownText}>Favorite Contacts</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const ContactScreen = ({ navigation, addContact }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landline, setLandline] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const saveContact = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a valid name.');
      return;
    }

    // Validation
    const isPhoneNumberValid = /^\d{10}$/.test(phoneNumber);
    const isLandlineValid = /^\d{10}$/.test(landline);

    if (!isPhoneNumberValid || !isLandlineValid) {
      Alert.alert('Error', 'Please enter a valid phone number and landline (10 digits only).');
      return;
    }

    const newContact = {
      id: Math.random().toString(),
      name,
      phoneNumber,
      landline,
      isFavorite,
      avatar: avatarSource,
    };

    addContact(newContact);
    // Clear the fields by resetting state variables
    setName('');
    setPhoneNumber('');
    setLandline('');
    setIsFavorite(false);
    setAvatarSource(null);

    navigation.navigate('ContactListScreen');
  };

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant permission to access the media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatarSource({ uri: result.uri });
    }
  };

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const navigateToContactList = () => {
    closeDropdown();
    navigation.navigate('ContactListScreen');
  };

  const navigateToFavoriteContactList = () => {
    closeDropdown();
    navigation.navigate('FavoriteContactListScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.drawerIcon} onPress={openDropdown}>
        <Icon name="bars" size={30} color="black" />
      </TouchableOpacity>
      <CustomDropdown
        isVisible={showDropdown}
        navigateToContactList={navigateToContactList}
        navigateToFavoriteContactList={navigateToFavoriteContactList}
      />

      <Text style={styles.title}>Add New Contact</Text>

      <TouchableOpacity  >
          <Icon name="camera" size={60} color="black" style={styles.cameraIcon} /> 
      </TouchableOpacity>
      <TouchableOpacity style={styles.addImageButton} onPress={openImagePicker}>
          <Text style={styles.addImageButtonText}>Add Image</Text>
        </TouchableOpacity>
      
      <Text style={styles.placeholder}>Full Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.placeholder}>Phone Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        keyboardType="numeric"
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Text style={styles.placeholder}>Landline</Text>

      <TextInput
        style={styles.input}
        placeholder="Landline"
        value={landline}
        keyboardType="numeric"
        onChangeText={(text) => setLandline(text)}
      />

      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={saveContact}>
        <Text style={styles.saveButtonText}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
  drawerIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 19,
    color: 'black',
    marginLeft: 1,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 8,
  },
  favoriteButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 30,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
  },
  addImageButton: {
    width: 200,
    height: 70,
    backgroundColor: '#3498db',
    //borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24, 
  },
  addImageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 250,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => dispatch({ type: 'ADD_CONTACT', payload: contact }),
  };
};

ContactScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ContactScreen);