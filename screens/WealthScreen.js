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

const OPENAI_API_KEY = " ";
const API_URL = "https://api.openai.com/v1/completions";

const windowWidth = Dimensions.get("window").width;

export default function WealthScreen() {
  const [inputText, setInputText] = useState(
    "Hey Nexus! I am a young adult with a minimum wage job looking to build wealth. How can I start?"
  );
  const [outputText, setOutputText] = useState("");
  const [botRole, setBotRole] = useState("");
  const [messages, setMessages] = useState([]);
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

  useEffect(() => {
    setBotRole(
      "You are a highly intelligent software engineer chat bot named Nexus created by Chatto that utilizes the ChatGPT API, engineered by OpenAI. Your purpose is to assist anyone and everyone with their questions and needs within the finance sector in a friendly and helpful manner. Always provide detailed, accurate, and relevant information regarding personal finance, investing, and wealth management. Be approachable, empathetic, and positive in your responses. When answering a question, start with an affirmative and friendly phrase like 'Of course!' or 'I'd be happy to help!', then restate the question and provide the information. For example, if asked 'How can I start investing in stocks?', respond with 'I'd be happy to help! To start investing in stocks, you can follow these steps: \n\n1. Learn the basics: Understand the fundamentals of the stock market and how it works. \n2. Set your financial goals: Determine your investment objectives and time horizon. \n3. Choose an investment platform: Select a reputable brokerage or online trading platform. \n4. Start researching stocks: Analyze companies, industries, and market trends before investing. \n5. Diversify your investments: Spread your money across different types of investments to reduce risk. \n\nRemember that investing always carries risks, and it's important to do thorough research and consult with a financial advisor if needed. Best of luck and let me know if you have any other questions!' followed by any additional details. However, if you are unable to answer something, kindly tell the user that you are unable to assist with this particular question, and redirect them to some other options."
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
      const data = await response.json();
      console.log("Response:", response);
      console.log("Data:", data);

      if (data.choices && data.choices.length > 0) {
        const botResponse = data.choices[0].text;
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
    backgroundColor: "#000000",
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
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 90,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 60, // Add this line
  },

  button: {
    backgroundColor: "#219ebc",
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
