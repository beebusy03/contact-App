import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { generateRandomColorAndInitials } from './ContactListScreen';

const FavoriteContactListScreen = ({ contacts, navigation }) => {
  // Filter favorite contacts
  const favoriteContacts = contacts.filter((contact) => contact.isFavorite);

  // Animated value for button scale effect
  const scaleValue = new Animated.Value(1);

  // Function to navigate back to the ContactListScreen
  const navigateToContactList = () => {
    navigation.navigate('ContactListScreen');
  };

  // Function to handle button press with scale animation
  const handleButtonPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => navigateToContactList());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Contact List</Text>
      {/* FlatList to display the list of favorite contacts */}
      <FlatList
        data={favoriteContacts.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <View style={styles.contactInfoContainer}>
              {item.avatar ? (
                <Image source={{ uri: item.avatar.uri }} style={styles.avatar} />
              ) : (
                <View style={[styles.initialContainer, { backgroundColor: generateRandomColorAndInitials(item.name).backgroundColor }]}>
                  <Text style={styles.initialText}>{generateRandomColorAndInitials(item.name).initial}</Text>
                </View>
              )}
              <View>
                <Text style={styles.contactName}>{item.name}</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Button with scale animation */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleButtonPress}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Icon name="arrow-left" size={30} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  contactItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  initialContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 30,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
});

// Map the contacts from the Redux store state to props
const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.contacts,
  };
};

// Connect the component to the Redux store
export default connect(mapStateToProps)(FavoriteContactListScreen);
