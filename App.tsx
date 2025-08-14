import React from 'react';
import {StatusBar} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F6FC"/>
      <NavigationContainer theme={DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
