// Temporary simple test to isolate the error
import SimpleTestApp from './SimpleTestApp';
export default SimpleTestApp;

// Original app with navigation (commented out for testing)
/*
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
      <Stack.Navigator
        initialRouteName="Input"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#007AFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="Input"
          component={InputScreen}
          options={{
            title: 'GPS Test',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tracking"
          component={TrackingScreen}
          options={{
            title: 'Tracking',
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            title: 'Resultat',
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
