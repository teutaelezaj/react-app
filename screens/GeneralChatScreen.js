/** @format */

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
const OPENAI_API_KEY = "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";
const API_URL = "https://api.openai.com/v1/completions";

const windowWidth = Dimensions.get("window").width;

export default function GeneralChatScreen() {
  const [inputText, setInputText] = useState(
    "Hello there! What is your name? What do you do?"
  );
  const [outputText, setOutputText] = useState("");
  const [botRole, setBotRole] = useState("");
  const [messages, setMessages] = useState([]);
  // console.log("====================------------=======", messages);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");

  const [userMessageHeight, setUserMessageHeight] = useState(0);
  // const [botTypingHeight, setBotTypingHeight] = useState(0);
  const [isNewMessage, setIsNewMessage] = useState(true);
  const [inputAreaHeight, setInputAreaHeight] = useState(90);
  const [isInitialized, setIsInitialized] = useState(false);

  

  const scrollViewRef = useRef(null);

  const handleClearText = () => {
    setInputText("");
  };
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("conversationHistory")
      .then((history) => {
        if (history && history.trim().startsWith("[")) {
          setMessages(JSON.parse(history));
        } else {
          setMessages([]);
        }
        setIsInitialized(true);
      })
      .catch((error) => console.log(error));
    

    }, [])
  );

  useEffect(() => {
    setBotRole(
      "You are a highly intelligent software engineer chat bot named Nexus created by Chatto that utilizes the ChatGPT API, engineered by OpenAI. Your purpose is to assist anyone and everyone with their questions and needs in a friendly and helpful manner, but more so serve as a friend. Make sure to ask users about their days, what they are up to, what their goals are, and overall be a friend. Always provide detailed, accurate, and relevant information. Be approachable, empathetic, and positive in your responses. When answering a question, start with an affirmative and friendly phrase, then restate the question and provide the information. However, if you are unable to answer something, kindly tell the user ‘I don’t really feel like talking about this’ and then redirect the topic."
    );
  }, []);
  
  
  

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChatbotResponse = async () => {
    // Check if a request is already being processed
    if (isProcessing) {
      return;
    }

    // Set isProcessing to true when starting a new request
    setIsProcessing(true);
    setBotTypingText("");
    setIsBotTyping(true);

    // Store user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: inputText },
    ]);

    // Clear input text
    setInputText("");

    // Construct the conversation history string
    let conversationHistory = botRole;
    messages.forEach((message) => {
      conversationHistory += `\n${message.type === "user" ? "Human" : "Bot"}: ${
        message.content
      }`;
    });
    conversationHistory += `\nHuman: ${inputText}\nBot:`;

    const requestBody = {
      prompt: conversationHistory,
      max_tokens: 2000,
      n: 1,
      stop: "Human:",
      model: "text-davinci-003",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    };
    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.text(); // Change response to text instead of JSON
      console.log("Response:", response);
      console.log("Data:", data);

      // Parse the response as JSON
      const jsonData = JSON.parse(data);

      if (jsonData.choices && jsonData.choices.length > 0) {
        const botResponse = jsonData.choices[0].text;
        console.log("Bot response:", botResponse);

        let typingIndex = 0;
        setBotTypingText("");
        setIsBotTyping(true);

        const typingInterval = setInterval(() => {
          if (typingIndex < botResponse.length) {
            setBotTypingText((prevText) => prevText + (typingIndex > 0 ? botResponse[typingIndex] : botResponse[typingIndex].trim()));
            typingIndex++;
          } else {
            clearInterval(typingInterval);
            setIsBotTyping(false);

            setMessages((prevMessages) => [
              ...prevMessages,
              { type: "bot", content: botResponse.trim() },
            ]);

            // Store conversation history in AsyncStorage
            // Store conversation history in AsyncStorage
AsyncStorage.setItem("conversationHistory", JSON.stringify(messages.concat({ type: "bot", content: botResponse.trim() }))); // Update this line

            console.log(
              "Conversation history111111111111111111",
              conversationHistory
            );
          }
        }, 50);

      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            content: "Sorry, I didn't understand that. Please try again.",
          },
        ]);
        setIsBotTyping(false);
      }
    } catch (error) {
      console.log(error);
      setIsBotTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          content:
            "Sorry, there was an error processing your request. Please try again.",
        },
      ]);
    }

    // Set isProcessing to false when the request is completed
    setIsProcessing(false);
  };

  const renderMessage = (message, index, showMessageContainer) => {
    if (message.content === "") {
      return null;
    }
    const isUser = message.type === "user";
    const iconName = isUser ? "user" : "android";
    const messageContainerStyle = isUser
      ? styles.userMessageContainer
      : styles.botMessageContainer;
    const messageTextStyle = isUser ? styles.userMessageText : styles.botMessageText;
  
    return showMessageContainer ? (
      <View key={index} style={messageContainerStyle}>
        <Icon
          name={iconName}
          size={24}
          color="#fff"
          style={styles.messageIcon}
        />
        <Text
          onLayout={(event) => {
            if (isUser) {
              setUserMessageHeight(event.nativeEvent.layout.height);
            }
          }}
          style={messageTextStyle}
        >
          {message.content}
        </Text>
      </View>
    ) : null;
  };
  
  return (
    <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            style={{ flex: 1 }}
          >
<ScrollView
  ref={scrollViewRef}
  onContentSizeChange={(contentWidth, contentHeight) => scrollViewRef.current.scrollTo({ x: 0, y: contentHeight, animated: true })}
  style={styles.chatArea}
  contentContainerStyle={{
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 130 : 160, // Increase paddingBottom for both platforms
    flexGrow: 1,
    justifyContent: "flex-start",
  }}
>

  {isInitialized && messages.map((message, index) => renderMessage(message, index, true))}
  {isBotTyping && messages.length > 0 && (
    renderMessage(
      { type: "bot", content: botTypingText },
      messages.length,
      isBotTyping
    )
  )}
</ScrollView>

    
            <StatusBar style="auto" />
            <View style={styles.inputArea}>
              <TextInput
                style={styles.input}
                placeholder="Type your message here"
                placeholderTextColor="#f5f5f5"
                onChangeText={handleInputChange}
                value={inputText}
                multiline={true}
                maxHeight={200}
              />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearText}
              >
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleChatbotResponse}
              >
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    backgroundColor: "#219ebc",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  chatArea: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 0,
    paddingBottom: 90,
    backgroundColor: "black", // Add this line to set the background color of the ScrollView
  },
  userMessageText: {
    fontSize: 18,
    margin: 10,
    color: "#fff",
    alignSelf: "flex-start",
    marginLeft: 10,
    width: "100%",
    minHeight: Dimensions.get("window").height / 8,
  },
  botMessageText: {
    fontSize: 18,
    margin: 10,
    color: "#fff",
    alignSelf: "flex-start",
    marginLeft: 10,
    width: "100%",
    minHeight: Dimensions.get("window").height / 8,
  },
  botMessageContainer: {
    backgroundColor: "rgba(128, 0, 128, 0.6)",
    alignSelf: "stretch",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10,
    marginVertical: 5,
    minHeight: 80,
  },
  chatAreaContent: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  firstMessageContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 0, // Set the marginTop to 0 for the first message
  },
  
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 120,
    width: "100%",
    borderTopColor: "#B2ABAB",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 60, // Add this line
    color: "#fff",
  },

  button: {
    backgroundColor: "#5E17EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  chatbotResponse: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    width: "100%",
  },
  typingArea: {
    backgroundColor: "#4caf50", // Set the background color to green
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
    width: "100%",
    minHeight: 40,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#219ebc",
    color: "#fff",
  },
  messageText: {
    fontSize: 18,
    color: "#fff",
  },
  divider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  typingText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#219ebc", // Change the color of the typing text to match the theme
  },
  clearButton: {
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 25,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#219ebc",
  },
  userMessageContainer: {
    backgroundColor: "black",
    alignSelf: "stretch",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10,
    marginVertical: 5,
    minHeight: 40,
  },
  historyMessageContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5, // Add margin between messages
    backgroundColor: "black", // Set the background color to black
  },
  messageContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  
});
