import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';

import InputScreen from './src/screens/InputScreen';
import TrackingScreen from './src/screens/TrackingScreen';
import ResultScreen from './src/screens/ResultScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Input');
  const [screenParams, setScreenParams] = useState({});

  // Simple navigation function
  const navigate = (screen, params = {}) => {
    setScreenParams(params);
    setCurrentScreen(screen);
  };

  // Render current screen
  const renderScreen = () => {
    const navigation = { navigate };
    const route = { params: screenParams };

    switch (currentScreen) {
      case 'Input':
        return <InputScreen navigation={navigation} route={route} />;
      case 'Tracking':
        return <TrackingScreen navigation={navigation} route={route} />;
      case 'Result':
        return <ResultScreen navigation={navigation} route={route} />;
      default:
        return <InputScreen navigation={navigation} route={route} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {renderScreen()}
    </View>
  );
}
