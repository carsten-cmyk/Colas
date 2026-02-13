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
          <Text style={styles.startButtonText}>
            Start{'\n'}→
          </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Logo Section
  logoContainer: {
    width: '130%', // Extend beyond container
    height: height * 0.5, // Double size
    alignItems: 'flex-end', // Right align logo
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.md,
    marginRight: -theme.spacing.xxl, // Push COMPLETELY to edge (64px)
  },
  logo: {
    width: '100%', // Full width - extends to edge
    height: '100%',
  },

  // Weather Section
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.lg, // Space from logo (32px)
    marginBottom: theme.spacing.xs, // Less bottom margin
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
    justifyContent: 'flex-start', // Start from top instead of center
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.xs,
    marginTop: theme.spacing.sm, // Space from weather
  },
  greetingText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.md,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.sm,
    lineHeight: 22, // Better readability
  },
  descriptionText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.md,
    lineHeight: 22, // Increased for readability (was 20)
  },
  statsText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.sm, // More space between items (was xs)
    lineHeight: 20, // Better line spacing
  },

  // Start Button - Circular (30% larger)
  startButton: {
    width: 90, // 30% larger (was 70)
    height: 90,
    borderRadius: 45, // Perfect circle
    backgroundColor: theme.colors.colasYellowLight, // Light yellow #FEF589
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    alignSelf: 'flex-start', // Align with left side of logo
    marginLeft: theme.spacing.sm, // Match logo left alignment
    ...theme.shadows.md,
  },
  startButtonText: {
    fontFamily: theme.fonts.semibold,
    fontSize: theme.fontSizes.md,
    color: theme.colors.colasBlack,
    textAlign: 'center', // Center both lines
    width: '100%', // Full width for centering
    lineHeight: 22, // Spacing between Start and arrow
  },
});
