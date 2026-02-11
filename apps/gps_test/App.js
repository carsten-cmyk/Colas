// Testing InputScreen directly (without navigation)
import InputScreen from './src/screens/InputScreen';

// Mock navigation for testing
const mockNavigation = {
  navigate: (screen, params) => {
    console.log('Navigate to:', screen, params);
    alert(`Would navigate to: ${screen}`);
  }
};

export default function App() {
  return <InputScreen navigation={mockNavigation} />;
}

/* Original with full navigation - will restore when InputScreen works
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InputScreen from './src/screens/InputScreen';
import TrackingScreen from './src/screens/TrackingScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Input">
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen name="Tracking" component={TrackingScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
