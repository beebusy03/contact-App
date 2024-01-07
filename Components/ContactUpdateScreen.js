import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const ContactUpdateScreen = ({ route, navigation, updateContact, deleteContact }) => {
  const { contact } = route.params;


  const [name, setName] = useState(contact.name);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
  const [landline, setLandline] = useState(contact.landline);
  const [isFavorite, setIsFavorite] = useState(contact.isFavorite);
  const [avatarSource, setAvatarSource] = useState(contact.avatar);

  const dispatch = useDispatch();

  // Function to update contact details
  const updateContactDetails = () => {
    const updatedContact = { ...contact, name, phoneNumber, landline, isFavorite };
    updateContact(updatedContact);
    navigation.goBack();
  };

  // Function to toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const deleteContactDetails = () => {
    dispatch({ type: 'REMOVE_CONTACT', payload: { id: contact.id } });
    navigation.goBack();
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
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Contact</Text>
      {/* Input field for name */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {/* Input field for phone number */}
      <TextInput
        style={styles.input}
        placeholder="Mobile Phone Number"
        value={phoneNumber}
        keyboardType="numeric" 
        onChangeText={(text) => setPhoneNumber(text)}
      />
      {/* Input field for landline */}
      <TextInput
        style={styles.input}
        placeholder="Landline"
        value={landline}
        keyboardType="numeric" 
        onChangeText={(text) => setLandline(text)}
      />

      {/* Favorite button */}
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="white" />
      </TouchableOpacity>
      {/* Change photo button */}
      <TouchableOpacity style={styles.button} onPress={openImagePicker} activeOpacity={0.7}>
        <Icon name="camera" size={20} color="white" />
        <Text style={styles.buttonText}>Change Photo</Text>
      </TouchableOpacity>
      
    
      {/* Update button with scaling effect */}
      <TouchableOpacity
        style={[styles.button, styles.updateButton]}
        onPress={updateContactDetails}
        activeOpacity={0.7}
      >
        <Icon name="pencil" size={20} color="white" />
        <Text style={styles.buttonText}>Update Contact</Text>
      </TouchableOpacity>

      {/* Delete button  */}
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={deleteContactDetails}
        activeOpacity={0.7}
      >
        <Icon name="trash" size={20} color="white" />
        <Text style={styles.buttonText}>Delete Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'lightyellow',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    backgroundColor: '#3498db',
  },
  updateButton: {
    backgroundColor: '#2ecc71', 
  },
  deleteButton: {
    backgroundColor: '#e74c3c', 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

// Map the dispatch functions to props
const mapDispatchToProps = (dispatch) => {
  return {
    updateContact: (contact) => dispatch({ type: 'UPDATE_CONTACT', payload: contact }),
    deleteContact: (contactId) => dispatch({ type: 'DELETE_CONTACT', payload: contactId }),
  };
};

// Connect the component to the Redux store
export default connect(null, mapDispatchToProps)(ContactUpdateScreen);
