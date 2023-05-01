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
const OPENAI_API_KEY = "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";
const API_URL = "https://api.openai.com/v1/completions";

const windowWidth = Dimensions.get("window").width;

export default function GeneralChatScreen() {
  const [inputText, setInputText] = useState(
    "Hello Nexus! What is today's horrorscope for Libras?"
  );
  const [outputText, setOutputText] = useState("");
  const [botRole, setBotRole] = useState("");
  const [messages, setMessages] = useState([]);
  console.log("====================------------=======", messages);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");

  const [userMessageHeight, setUserMessageHeight] = useState(0);
  // const [botTypingHeight, setBotTypingHeight] = useState(0);
  const [isNewMessage, setIsNewMessage] = useState(true);
  const [inputAreaHeight, setInputAreaHeight] = useState(90);

  const scrollViewRef = useRef(null);

  const handleClearText = () => {
    setInputText("");
  };
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("conversationHistory")
        .then((history) => {
          setMessages([history]);
        })
        .catch((error) => console.log(error));
    }, [])
  );

  useEffect(() => {
    setBotRole(
      "You are a highly intelligent chat bot named Nexus created by Chatto that utilizes the ChatGPT API, engineered by OpenAI. Your purpose is to assist anyone and everyone with their questions and needs in a friendly and helpful manner, but will take on the role of an astrologer. You will be prompted with questions about the different astrological signs. Be sure to always give positive answers, but acknowledge that maybe the user is going through a stressful time, and how they can overcome this. Always provide detailed, accurate, and relevant information. Be approachable, empathetic, and positive in your responses. When answering a question, start with an affirmative and friendly phrase, then restate the question and provide the information. However, if you are unable to answer something, kindly tell the user ‘I don’t really feel like talking about this’ and then redirect the topic. Keep a casual and personable personality - like you are a friend."
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
            setBotTypingText((prevText) => prevText + botResponse[typingIndex]);
            typingIndex++;
          } else {
            clearInterval(typingInterval);
            setIsBotTyping(false);

            setMessages((prevMessages) => [
              ...prevMessages,
              { type: "bot", content: botResponse.trim() },
            ]);

            // Store conversation history in AsyncStorage
            AsyncStorage.setItem("conversationHistory", conversationHistory);
            console.log(
              "Conversation history111111111111111111",
              conversationHistory
            );
          }
        }, 50);

        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { type: 'bot', content: '' },
        // ]);
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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={styles.chatArea}
          contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          {messages.map((message, index) => (
            <Text
              key={index}
              onLayout={(event) => {
                if (message.type === "user") {
                  setUserMessageHeight(event.nativeEvent.layout.height);
                }
              }}
              style={
                message.type === "user"
                  ? styles.userMessageText
                  : styles.botMessageText
              }
            >
              {message.type === "user" ? "🧑 " : "🧠 "}
              {message.content}
            </Text>
          ))}
          {isBotTyping && (
            <Text style={styles.botMessageText}>🧠 {botTypingText}</Text>
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
    backgroundColor: "#f5f5f5",
    backgroundColor: "#000000",
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
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
  userMessageText: {
    fontSize: 18,
    margin: 10, // Increase margin for more spacing between messages
    color: "#fff",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  botMessageText: {
    fontSize: 18,
    margin: 10, // Increase margin for more spacing between messages
    color: "#fff",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  chatAreaContent: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    // borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 90,
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
    margin: 2,
    color: "#fff",
    padding: 10, // Add padding around the text
    borderRadius: 10, // Add border radius for rounded corners
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
});
