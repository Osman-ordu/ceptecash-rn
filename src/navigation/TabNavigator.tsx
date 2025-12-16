import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import HomeScreen from '@/screens/home/HomeScreen';
import PortfolioScreen from '@/screens/portfolio/PortfolioScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import { TabParamList } from '@/types';
import MarketsStack from './MarketStack';

const Tab = createBottomTabNavigator<TabParamList>();

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const borderColor = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const inactiveTextColor = colorScheme === 'dark' ? '#9BA1A6' : '#687076';
  const activeColor = theme.colors.primary; // Yeşil renk (#22C55E)

  if (!navigation || !state || !descriptors) {
    return null;
  }

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          backgroundColor: theme.colors.background,
          borderTopColor: borderColor,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!navigation) return;

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            try {
              navigation.navigate(route.name as never);
            } catch (error) {
              // Navigation not ready, ignore
            }
          }
        };

        const onLongPress = () => {
          if (!navigation) return;

          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'MarketsStack') {
          iconName = isFocused ? 'trending-up' : 'trending-up-outline';
        } else if (route.name === 'Portfolio') {
          iconName = isFocused ? 'pie-chart' : 'pie-chart-outline';
        } else if (route.name === 'Profile') {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        const iconColor = isFocused ? activeColor : inactiveTextColor;
        const textColor = isFocused ? activeColor : inactiveTextColor;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {isFocused && (
              <View
                style={[
                  styles.activeBorder,
                  {
                    backgroundColor: activeColor,
                  },
                ]}
              />
            )}
            <Ionicons name={iconName} size={24} color={iconColor} />
            <ThemedText
              style={[
                styles.tabLabel,
                {
                  color: textColor,
                  fontWeight: isFocused ? '600' : '500',
                },
              ]}
            >
              {label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen
        name="MarketsStack"
        component={MarketsStack}
        options={{ title: 'Markets' }}
      />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{ title: 'Portfolio' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    marginHorizontal: 0.5,
    height: 80,
    borderTopWidth: 0.5,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 5,
  },
  activeBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1.5,
    borderTopLeftRadius: 0.5,
    borderTopRightRadius: 0.5,
  },
  tabLabel: {
    fontSize: 12,
  },
});

