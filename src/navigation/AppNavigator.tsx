import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Onboarding from '../screens/Onboarding';
import Reminders from '../screens/Reminders';
import Calendar from '../screens/Calendar';
import Favorites from '../screens/Favorites';
import Tasks from '../screens/Tasks';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ title: 'Dashboard' }} />
      <Stack.Screen name="Reminders" component={Reminders} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Tasks" component={Tasks} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
