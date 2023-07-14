import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactList from './components/ContactList'
import FavoriteList from './components/FavoriteList';
import AddContact from './components/AddContact';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateContact from './components/UpdateContact';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator initialRouteName='Contact List' screenOptions={{headerTitleAlign: 'center'}}>
      <Drawer.Screen name="Contact List" component={ContactList} />
      <Drawer.Screen name="Favorite List" component={FavoriteList} />
    </Drawer.Navigator>
  );
}
const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign:'center'}}>
          <Stack.Screen name='Drawer' component={DrawerRoutes} options={{headerShown:false}}/>
          <Stack.Screen name="Add New Contact" component={AddContact} />
          <Stack.Screen name="Update Existing Contact" component={UpdateContact} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}



export default App;
