import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import FitnessScreen from './screens/FitnessScreen';
import FinanceScreen from './screens/FinanceScreen';
import HomeScreen from './screens/HomeScreen';
import GeneralChatScreen from './screens/GeneralChatScreen';
import HorrorscopeScreen from './screens/HorrorscopeScreen';
import SettingsScreen from './screens/SettingsScreen';
import SettingsInfo from './screens/SettingsInfo';
import TermsOfService from './screens/TermsOfService';
import ChatRules from './screens/ChatRules';
import LoadingScreen from './screens/LoadingScreen';

import NutritionScreen from './screens/NutritionScreen';
import DreamScreen from './screens/DreamScreen';
import StoryScreen from './screens/StoryScreen';
import MathScreen from './screens/MathScreen';
import HistoryScreen from './screens/HistoryScreen';
import SWEScreen from './screens/SWEScreen';
import DatingTipsScreen from './screens/DatingTipsScreen';
import GiftScreen from './screens/GiftScreen';
import FriendsScreen from './screens/FriendsScreen';
import WealthScreen from './screens/WealthScreen';
import InvestingScreen from './screens/InvestingScreen';
import InterviewScreen from './screens/InterviewScreen';
import CareerScreen from './screens/CareerScreen';
import TechScreen from './screens/TechScreen';
import WeightScreen from './screens/WeightScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="GeneralChat" component={GeneralChatScreen} options={{ title: 'GeneralChat' }} />
        <Stack.Screen name="Fitness" component={FitnessScreen} options={{ title: 'Fitness Tips' }} />
        <Stack.Screen name="Finance" component={FinanceScreen} options={{ title: 'Establishing Wealth' }} />
        {/* Add more Stack.Screen components for other categories */}
        <Stack.Screen name="Horrorscope" component={HorrorscopeScreen} options={{ title: 'Horrorscopes' }} />
        <Stack.Screen name="Nutrition" component={NutritionScreen} options={{ title: 'Nutrition' }} />
        <Stack.Screen name="Dream" component={DreamScreen} options={{ title: 'Dream' }} />
        <Stack.Screen name="Story" component={StoryScreen} options={{ title: 'Story' }} />
        <Stack.Screen name="Math" component={MathScreen} options={{ title: 'Math' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
        <Stack.Screen name="SWE" component={SWEScreen} options={{ title: 'SWE' }} />
        <Stack.Screen name="Dating" component={DatingTipsScreen} options={{ title: 'Dating' }} />
        <Stack.Screen name="Gift" component={GiftScreen} options={{ title: 'Gift' }} />
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ title: 'Friends' }} />
        <Stack.Screen name="Wealth" component={WealthScreen} options={{ title: 'Wealth' }} />
        <Stack.Screen name="Investing" component={InvestingScreen} options={{ title: 'Investing' }} />
        <Stack.Screen name="Interview" component={InterviewScreen} options={{ title: 'Interview' }} />
        <Stack.Screen name="Career" component={CareerScreen} options={{ title: 'Career' }} />
        <Stack.Screen name="Tech" component={TechScreen} options={{ title: 'Tech' }} />
        <Stack.Screen name="Weight" component={WeightScreen} options={{ title: 'Weight' }} />

        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen name="SettingsInfo" component={SettingsInfo} options={{ title: 'SettingsInfo' }} />
        <Stack.Screen name="TermsOfService" component={TermsOfService} options={{ title: 'TermsOfService' }} />
        <Stack.Screen name="ChatRules" component={ChatRules} options={{ title: 'ChatRules' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}













