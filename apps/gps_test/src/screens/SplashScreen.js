import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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
    <View style={styles.container}>
      {/* Left Side - Worker Image (60%) */}
      <View style={styles.imageSection}>
        <Image
          source={require('../../assets/hero-worker.png')}
          style={styles.workerImage}
          resizeMode="cover"
        />
      </View>

      {/* Right Side - Yellow Strip (40%) */}
      <View style={styles.yellowStrip}>
        {/* COLAS Logo - Vertical */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/colas-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Weather Info - Icon and Temperature */}
        <View style={styles.weatherContainer}>
          <Image
            source={require('../../assets/icon-sun.png')}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
          <Text style={styles.temperatureText}>14 Grader</Text>
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <Text style={styles.greetingText}>Godmorgen.</Text>
          <Text style={styles.subtitleText}>Idag bliver en god dag.</Text>
        </View>

        {/* Start Button - Circular */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  // Left Side - Image Section (60%)
  imageSection: {
    width: width * 0.75, // Extended further
    height: height,
    marginLeft: width * -0.15, // Shift 15% to the left (was -0.05)
  },
  workerImage: {
    width: '100%',
    height: '100%',
  },

  // Right Side - Yellow Strip (40%)
  yellowStrip: {
    width: width * 0.4,
    height: height,
    backgroundColor: theme.colors.colasYellow,
    paddingVertical: theme.spacing.lg,
    paddingLeft: theme.spacing.sm, // Only left padding
    paddingRight: 0, // No right padding for logo
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  // Logo Section
  logoContainer: {
    width: '130%', // Extend beyond container
    height: height * 0.5, // Double size
    alignItems: 'flex-end', // Right align logo
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.md,
    marginTop: height * 0.05, // Move logo 5% down
    marginRight: -theme.spacing.xxl, // Push COMPLETELY to edge (64px)
  },
  logo: {
    width: '100%', // Full width - extends to edge
    height: '100%',
  },

  // Weather Section
  weatherContainer: {
    flexDirection: 'row', // Icon next to text
    alignItems: 'center',
    alignSelf: 'flex-start', // Align to left
    marginLeft: theme.spacing.sm, // Match text padding
    marginTop: 80, // 4 line breaks from logo (~4br)
    marginBottom: height * 0.02, // 2% spacing to text
  },
  weatherIcon: {
    width: 24,
    height: 24,
    marginRight: 4, // Reduced spacing to text
  },
  temperatureText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.xs, // Smaller text (12px)
    color: theme.colors.colasBlack,
  },

  // Text Content
  textContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    marginBottom: height * 0.03, // 3% spacing to button (reduced)
  },
  greetingText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.xs, // Smaller text (12px)
    color: theme.colors.colasBlack,
    lineHeight: 18,
    marginBottom: 4,
  },
  subtitleText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.xs, // Smaller text (12px)
    color: theme.colors.colasBlack,
    lineHeight: 18,
  },

  // Start Button - Circular
  startButton: {
    width: 70,
    height: 70,
    borderRadius: 35, // Perfect circle
    backgroundColor: theme.colors.colasYellowLight, // Light yellow #FEF589
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm, // Reduced margin (16px)
    alignSelf: 'flex-start', // Left aligned
    marginLeft: theme.spacing.md, // Centered relative to text (~24px)
    ...theme.shadows.md,
  },
  startButtonText: {
    fontFamily: theme.fonts.semibold,
    fontSize: theme.fontSizes.sm, // Smaller text (14px, down from 16px)
    color: theme.colors.colasBlack,
    textAlign: 'center',
    marginTop: 3, // Move text down 3px
  },
});
