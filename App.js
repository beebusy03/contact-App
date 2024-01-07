// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import ContactListScreen from './Components/ContactListScreen';
import FavoriteContactListScreen from './Components/FavoriteContactListScreen';
import ContactScreen from './Components/ContactScreen';
import ContactUpdateScreen from './Components/ContactUpdateScreen';
import store from './Components/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ContactScreen">
          <Stack.Screen name="ContactScreen" component={ContactScreen} />
          <Stack.Screen name="ContactListScreen" component={ContactListScreen} />
          <Stack.Screen name="FavoriteContactListScreen" component={FavoriteContactListScreen} />
          <Stack.Screen name="ContactUpdate" component={ContactUpdateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
