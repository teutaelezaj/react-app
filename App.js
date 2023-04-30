/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FitnessScreen from "./screens/FitnessScreen";
import FinanceScreen from "./screens/FinanceScreen";
import HomeScreen from "./screens/HomeScreen";
import GeneralChatScreen from "./screens/GeneralChatScreen";
import HorrorscopeScreen from "./screens/HorrorscopeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SettingsInfo from "./screens/SettingsInfo";
import TermsOfService from "./screens/TermsOfService";
import ChatRules from "./screens/ChatRules";
import LoadingScreen from "./screens/LoadingScreen";

import NutritionScreen from "./screens/NutritionScreen";
import DreamScreen from "./screens/DreamScreen";
import StoryScreen from "./screens/StoryScreen";
import MathScreen from "./screens/MathScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SWEScreen from "./screens/SWEScreen";
import DatingTipsScreen from "./screens/DatingTipsScreen";
import GiftScreen from "./screens/GiftScreen";
import FriendsScreen from "./screens/FriendsScreen";
import WealthScreen from "./screens/WealthScreen";
import InvestingScreen from "./screens/InvestingScreen";
import InterviewScreen from "./screens/InterviewScreen";
import CareerScreen from "./screens/CareerScreen";
import TechScreen from "./screens/TechScreen";
import WeightScreen from "./screens/WeightScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="GeneralChat"
          component={GeneralChatScreen}
          options={{
            title: "GeneralChat",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="Fitness"
          component={FitnessScreen}
          options={{
            title: "Fitness Tips",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Finance"
          component={FinanceScreen}
          options={{
            title: "Establishing Wealth",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        {/* Add more Stack.Screen components for other categories */}
        <Stack.Screen
          name="Horrorscope"
          component={HorrorscopeScreen}
          options={{
            title: "Horrorscopes",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Nutrition"
          component={NutritionScreen}
          options={{
            title: "Nutrition",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Dream"
          component={DreamScreen}
          options={{
            title: "Dream",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Story"
          component={StoryScreen}
          options={{
            title: "Story",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Math"
          component={MathScreen}
          options={{
            title: "Math",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: "History",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="SWE"
          component={SWEScreen}
          options={{
            title: "SWE",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Dating"
          component={DatingTipsScreen}
          options={{
            title: "Dating",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Gift"
          component={GiftScreen}
          options={{
            title: "Gift",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            title: "Friends",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Wealth"
          component={WealthScreen}
          options={{
            title: "Wealth",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Investing"
          component={InvestingScreen}
          options={{
            title: "Investing",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Interview"
          component={InterviewScreen}
          options={{
            title: "Interview",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Career"
          component={CareerScreen}
          options={{
            title: "Career",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Tech"
          component={TechScreen}
          options={{
            title: "Tech",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Weight"
          component={WeightScreen}
          options={{
            title: "Weight",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="SettingsInfo"
          component={SettingsInfo}
          options={{
            title: "SettingsInfo",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="TermsOfService"
          component={TermsOfService}
          options={{
            title: "TermsOfService",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="ChatRules"
          component={ChatRules}
          options={{
            title: "ChatRules",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              alignSelf: "center",
            },

            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
