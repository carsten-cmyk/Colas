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
          <Text style={styles.greetingText}>Godmorgen Jens</Text>
          <Text style={styles.descriptionText}>
            Du har 3 opgaver{'\n'}aktiveret for Colas
          </Text>
          <Text style={styles.statsText}>• 3 Opgaver</Text>
          <Text style={styles.statsText}>• 2 Aflevering</Text>
        </View>

        {/* Start Button - Circular */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start →</Text>
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
    width: width * 0.65, // Increased from 0.6 to extend image
    height: height,
    marginLeft: width * -0.05, // Shift 5% to the left
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
    paddingHorizontal: theme.spacing.sm,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Logo Section
  logoContainer: {
    width: '100%',
    height: height * 0.5, // Double size
    alignItems: 'flex-end', // Right align logo
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.md,
  },
  logo: {
    width: '90%', // 90% width positioned to the right
    height: '100%',
  },

  // Weather Section
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  weatherIcon: {
    width: 24,
    height: 24,
    marginRight: theme.spacing.xs,
  },
  temperatureText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.colasBlack,
  },

  // Text Content
  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.xs,
  },
  greetingText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.md,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.sm,
  },
  descriptionText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  statsText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.xs,
  },

  // Start Button - Circular
  startButton: {
    width: 70,
    height: 70,
    borderRadius: 35, // Perfect circle
    backgroundColor: theme.colors.colasYellowLight, // Light yellow #FEF589
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  startButtonText: {
    fontFamily: theme.fonts.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.colasBlack,
  },
});
