import React, { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { Colors } from '@/constants/theme';
import { slides } from '@/db';
import { RootStackParamList } from '@/types';
const { width, height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  const handleGetStarted = () => {
    try {
      navigation.replace('Tabs');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <ThemedView style={styles.root}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {slides.map((slide, index) => (
          <View key={slide.key} style={styles.slide}>
            <View style={styles.backgroundContainer}>
              <View style={styles.contentContainer}>
                <ThemedText type="title" style={styles.title}>
                  {slide.title}
                </ThemedText>
                <ThemedText style={styles.subtitle}>{slide.subtitle}</ThemedText>
              </View>

              <View style={styles.middleContainer}>
                <View style={styles.dotsContainer}>
                  {slides.map((_, dotIndex) => {
                    const isActive = dotIndex === activeIndex;
                    return (
                      <View
                        key={dotIndex}
                        style={[
                          styles.dot,
                          {
                            backgroundColor: isActive
                              ? Colors.light.tint
                              : 'rgba(255,255,255,0.4)',
                            width: isActive ? 20 : 8,
                          },
                        ]}
                      />
                    );
                  })}
                </View>
              </View>

              {index === slides.length - 1 && (
                <View style={styles.bottomContainer}>
                  <Button
                    title="Başla"
                    onPress={handleGetStarted}
                    variant="primary"
                    size="small"
                    style={styles.startButton}
                  />
                </View>
              )}
            </View>

            <View style={styles.logoContainer}>
              <View style={styles.logoTextContainer}>
                <ThemedText style={styles.logoTextFin}>fin</ThemedText>
                <ThemedText style={styles.logoTextTrack}>TRACK</ThemedText>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'visible',
  },
  slide: {
    width,
    height,
    overflow: 'visible',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1a1a', // Gri/siyah arka plan
    overflow: 'visible',
  },
  contentContainer: {
    position: 'absolute',
    top: height * 0.15,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
    overflow: 'visible',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#ffffff',
  },
  subtitle: {
    marginTop: 16,
    textAlign: 'center',
    color: 'rgba(226,232,240,0.9)',
    fontSize: 16,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    overflow: 'visible',
    zIndex: 10,
    pointerEvents: 'none',
  },
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoTextFin: {
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 0,
    color: Colors.light.tint,
    includeFontPadding: false,
  },
  logoTextTrack: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0,
    color: Colors.light.tint,
    includeFontPadding: false,
    marginLeft: 2,
  },
  middleContainer: {
    position: 'absolute',
    top: height * 0.65,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  startButton: {
    minWidth: 120,
  },
});

