import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function TabBarIcon(props: {
  nameIcons: 'font-awesome' | 'material-community-icons';
  name: React.ComponentProps<typeof FontAwesome>['name'] | React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  const { nameIcons, name, color } = props;

  if (nameIcons === 'font-awesome') {
    return <FontAwesome name={name as React.ComponentProps<typeof FontAwesome>['name']} size={28} color={color} style={{ marginBottom: -3 }} />;
  } else if (nameIcons === 'material-community-icons') {
    return <MaterialCommunityIcons name={name as React.ComponentProps<typeof MaterialCommunityIcons>['name']} size={28} color={color} style={{ marginBottom: -3 }} />;
  } else {
    console.error(`Ícone '${name}' não encontrado em FontAwesome ou MaterialCommunityIcons.`);
    return null;
  }
}



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color }) => <TabBarIcon nameIcons="font-awesome" name="eye" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color }) => <TabBarIcon nameIcons="material-community-icons" name="movie-play" color={color} />,
        }}
      />
    </Tabs>
  );
}
