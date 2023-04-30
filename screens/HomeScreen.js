/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Pressable,
  FlatList,
  Linking, // Add this line
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

// import { Ionicons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

const suggestionsData = [
  {
    category: "Fun",
    emoji: "🎉",
    subcategories: ["Astrology", "Dream Interpreter", "Storyteller"],
  },
  {
    category: "Education",
    emoji: "🧠",
    subcategories: ["Math", "History", "Software Engineering"],
  },
  {
    category: "Relationship",
    emoji: "💞",
    subcategories: ["Dating", "Gift Advice", "Friendships"],
  },
  // Add more categories and subcategories here
  {
    category: "Personal Finance",
    emoji: "💰",
    subcategories: ["Building Wealth", "Stocks", "Investing"],
  },

  {
    category: "Career",
    emoji: "👔",
    subcategories: ["Interview Help", "Career Options", "Breaking Into Tech"],
  },

  {
    category: "Fitness & Nutrition",
    emoji: "💪",
    subcategories: ["Building Muscle", "Losing Weight", "Nutrition Tips"],
  },
];

const subcategoryScreens = {
  "Building Muscle": "Fitness",
  Astrology: "Horrorscope",
  Stocks: "Finance",
  "Software Engineering": "Coding",
  "Nutrition Tips": "Nutrition",
  "Dream Interpreter": "Dream",
  Storyteller: "Story",
  Math: "Math",
  History: "History",
  "Software Engineering": "SWE",
  Dating: "Dating",
  "Gift Advice": "Gift",
  Friendships: "Friends",
  "Building Wealth": "Wealth",
  Investing: "Investing",
  "Interview Help": "Interview",
  "Career Options": "Career",
  "Breaking Into Tech": "Tech",
  "Losing Weight": "Weight",
  // Add other subcategories and their corresponding screen names here

  //add the rest later
};

export default function HomeScreen({ navigation, changes }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  console.log("Message", questions);
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("conversationHistory")
        .then((history) => {
          // Parse conversation history string into an array of question-answer pairs
          const pairs = history.split("\n");
          // console.log("Conversation history========", history);
          // Extract only the first question
          let firstQuestion = pairs.find((pair) => pair.startsWith("Human:"));
          if (firstQuestion) {
            firstQuestion = firstQuestion.replace("Human:", "").trim();
            setQuestions([firstQuestion]);
          }
        })
        .catch((error) => console.log(error));
    }, [])
  );
  // useEffect(() => {
  //   // Retrieve conversation history from AsyncStorage
  //   AsyncStorage.getItem("conversationHistory")
  //     .then((history) => {
  //       // Parse conversation history string into an array of question-answer pairs
  //       const pairs = history.split("\n");

  //       // Extract only the first question
  //       let firstQuestion = pairs.find((pair) => pair.startsWith("Human:"));
  //       if (firstQuestion) {
  //         firstQuestion = firstQuestion.replace("Human:", "").trim();
  //         setQuestions([firstQuestion]);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const renderQuestion = ({ item }) => (
    <TouchableOpacity
      style={styles.boxView}
      onPress={() => navigation.navigate("GeneralChat")}
    >
      <View style={{ height: "55%" }}>
        <Text style={styles.boxTextStyle}>{item.substring(0, 60) + "..."}</Text>
      </View>
      <View
        style={{
          width: "90%",
          height: "35%",
          alignSelf: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={[
            styles.boxTextStyle,
            {
              color: "#B2ABAB",

              fontWeight: "bold",
              fontSize: 18,
            },
          ]}
        >
          See your recent Conversation
        </Text>
        <Text
          style={[
            styles.boxTextStyle,
            {
              color: "#B2ABAB",

              fontWeight: "bold",
              fontSize: 45,
              bottom: "5%",
            },
          ]}
        >
          ••••
        </Text>
      </View>
    </TouchableOpacity>
  );
  const handleCategoryPress = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  React.useEffect(() => {
    handleCategoryPress("Fun");
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Chatto",
      headerTitleAlign: "left",

      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => Linking.openURL("https://www.google.com")}
          >
            <FontAwesome5 name="discord" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="ios-settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),

      headerStyle: {
        backgroundColor: "#000000", // replace with your desired color
      },
      headerTintColor: "#FFFFFF", // replace with your desired color
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.suggestionsText}>Meet Nexus</Text>
      <Text style={styles.subtitleText}>
        Chat with Nexus, an AI chat bot designed by Chatto to assist you with
        anything you need!
      </Text>
      <View
        style={{
          width: "95%",
          height: "5%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={styles.historyTextStyle}>My History</Text>
        <Text
          style={[styles.historyTextStyle, { fontSize: 15, color: "#B2ABAB" }]}
        >
          See All
        </Text>
      </View>
      <View>
        <FlatList
          data={questions}
          renderItem={renderQuestion}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={{
            alignSelf: "center",
            paddingHorizontal: "5%",
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Text style={styles.suggestionsText}>Suggestions</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollView}
      >
        {suggestionsData.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  selectedCategory === suggestion.category
                    ? "#5E17EB"
                    : "#272521",
              },
            ]}
            onPress={() => handleCategoryPress(suggestion.category)}
          >
            <Text style={styles.categoryButtonText}>
              {suggestion.emoji} {suggestion.category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.mainContent}>
        <FlatList
          data={
            selectedCategory
              ? suggestionsData.find(
                  (suggestion) => suggestion.category === selectedCategory
                ).subcategories
              : []
          }
          renderItem={({ item: subcategory }) => (
            <TouchableOpacity
              style={styles.subcategoryButton}
              onPress={() => {
                const screenName =
                  subcategoryScreens[subcategory] || "DefaultScreen";
                navigation.navigate(screenName);
              }}
            >
              <Text style={styles.subcategoryButtonText}>{subcategory}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.subcategoriesContent}
          ListEmptyComponent={<View style={{ flex: 1 }} />} // Add this line
        />
      </View>

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Write your message..."
          onFocus={() => navigation.navigate("GeneralChat")}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => navigation.navigate("GeneralChat")}
        >
          <MaterialIcons name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  mainContent: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 20,
  },

  boxView: {
    width: 220,
    height: 100,
    backgroundColor: "#272521",
    borderRadius: 10,
    justifyContent: "center",
    // alignSelf: "center",
  },
  boxTextStyle: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
  historyTextStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: 33,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 40,
    marginTop: 55,
    textAlign: "center",
  },
  wavingEmoji: {
    fontSize: 28,
  },
  subtitleText: {
    fontSize: 18,
    color: "#8ecae6",
    // marginBottom: 30,
    marginRight: 30,
    marginLeft: 20,
  },
  suggestionsText: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 20,
    // marginTop: 20,
  },
  categoriesScrollView: {
    flexDirection: "row",
    maxHeight: 60, // Adjust this value to set the height of the categoriesScrollView
  },
  subcategoriesScrollView: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    width: screenWidth,
    marginTop: 10,
    alignItems: "center", // Add this line
    justifyContent: "center", // Add this line
  },
  categoryContainer: {
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "#219ebc",
    height: 40, // Set a fixed height for the categoryButton
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center", // Add this line to vertically center the text
    // marginBottom: 10, // Remove this line
    marginHorizontal: 10,
  },
  categoryButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  },
  subcategoriesScrollView: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    width: screenWidth,
    marginTop: 10,
  },

  subcategoryButton: {
    backgroundColor: "#272521",

    paddingVertical: 16,
    paddingHorizontal: 20,
    width: screenWidth - 40, // Subtract the paddingHorizontal of the ScrollView (20 * 2)
    // borderRadius: 0, //square
    borderBottomWidth: 1,
    // borderBottomColor: "#5E17EB",
    marginVertical: 5, // Add vertical margin
    borderRadius: 12,
  },
  subcategoryButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  generalChatButton: {
    backgroundColor: "#5E17EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 30,
    width: 180, // Add a fixed width, adjust this value to your desired width
    alignSelf: "center", // To center the button
  },
  generalChatButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B2ABAB",
    justifyContent: "space-between",
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 80,
    width: screenWidth,
    alignSelf: "center", // Add this line
  },
  messageInput: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#5E17EB",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subcategoriesContent: {
    flexGrow: 1,
  },
  subcategoriesWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  subcategoriesContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
