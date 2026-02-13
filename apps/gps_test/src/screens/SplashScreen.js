import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { theme } from '../config/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Don't render until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  const handleStart = () => {
    navigation.navigate('Input');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Colas Logo - Vertical */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/colas-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Hero Image - Worker */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/hero-worker.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Start Button - Circular with border and black square icon */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <View style={styles.buttonCircle}>
              {/* Black square icon */}
              <View style={styles.blackSquare} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.colasYellow,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
  },

  // Logo Section
  logoContainer: {
    width: width * 0.25, // 25% of screen width
    height: height * 0.15, // 15% of screen height
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },

  // Hero Image Section
  heroContainer: {
    width: width * 0.6, // 60% of screen width
    height: height * 0.5, // 50% of screen height
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },

  // Button Section
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
  },
  startButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40, // Perfect circle
    borderWidth: 3,
    borderColor: theme.colors.colasYellowLight,
    backgroundColor: theme.colors.colasYellow,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  blackSquare: {
    width: 28,
    height: 28,
    backgroundColor: theme.colors.colasBlack,
    borderRadius: 4, // Slight rounding to match design
  },
});
