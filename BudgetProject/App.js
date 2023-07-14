import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store/Store'
import HomePage from './src/components/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BudgetList from './src/components/BudgetList';
import AddBudget from './src/components/AddBudget';

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerTitleAlign: 'center'}}>
            <Stack.Screen name='Home' component={HomePage}/>
            <Stack.Screen name='Budget List' component={BudgetList}/>
            <Stack.Screen name='Add Budget' component={AddBudget}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}



