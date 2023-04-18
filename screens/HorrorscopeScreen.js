import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from "react";

const OPENAI_API_KEY = "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";
const API_URL = "https://api.openai.com/v1/completions";

export default function HorrorscopeScreen({ navigation }) {
  const [inputText, setInputText] = useState("Hey Nexus! What is todays horrorscope for Libras?");
  const [outputText, setOutputText] = useState("");
  const [botRole, setBotRole] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    setBotRole("You are a highly intelligent software engineer chat bot named Nexus created by Chatto that utilizes the ChatGPT API, engineered by OpenAI. Your purpose is to assist anyone and everyone with their questions and needs in a friendly and helpful manner, but will take on the role of an astrologer. You will be prompted with questions about the different astrological signs. Be sure to always give positive answers, but acknowledge that maybe the user is going through a stressful time, and how they can overcome this. Always provide detailed, accurate, and relevant information. Be approachable, empathetic, and positive in your responses. When answering a question, start with an affirmative and friendly phrase, then restate the question and provide the information. However, if you are unable to answer something, kindly tell the user ‘I don’t really feel like talking about this’ and then redirect the topic. Keep a casual and personable personality - like you are a friend.");
  }, []);
  
  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleChatbotResponse = async () => {
    setIsBotTyping(true);
    // Store user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', content: inputText },
    ]);
  
    // Clear input text
    setInputText('');
  
    // Construct the conversation history string
    let conversationHistory = botRole;
    messages.forEach((message) => {
      conversationHistory += `\n${message.type === 'user' ? 'Human' : 'Bot'}: ${message.content}`;
    });
    conversationHistory += `\nHuman: ${inputText}\nBot:`;
  
    const requestBody = {
      prompt: conversationHistory,
      max_tokens: 2000,
      n: 1,
      stop: "Human:",
      model: "text-davinci-003"
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
  
        // Store bot response
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', content: botResponse.trim() },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', content: "Sorry, I didn't understand that. Please try again." },
        ]);
      } setIsBotTyping(false);
    } catch (error) {
        console.log(error);
        setIsBotTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', content: "Sorry, there was an error processing your request. Please try again." },
        ]);
      }
    };
  
  

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Horrorscope</Text>
          </View>
          <ScrollView style={styles.chatArea}>
            {messages.map((message, index) => (
              <View
                key={index}
                style={[
                  message.type === 'user' ? styles.userMessage : styles.chatbotResponse,
                ]}
              >
                <Text style={styles.messageText}>{message.content}</Text>
              </View>
            ))}
          </ScrollView>
          {isBotTyping && (
            <View style={styles.typingIndicator}>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text style={styles.typingText}>Nexus is typing...</Text>
            </View>
          )}
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholder="Type your message here"
              onChangeText={handleInputChange}
              value={inputText}
              multiline={true}maxHeight={200}
              />
              <TouchableOpacity style={styles.button} onPress={handleChatbotResponse}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </View>
        );
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#f5f5f5',
        },
        header: {
          backgroundColor: '#5B5C5D',
          paddingTop: 40,
          paddingBottom: 10,
          paddingHorizontal: 20,
        },
        title: {
          fontSize: 24,
          fontWeight: "bold",
          color: '#fff',
        },
        chatArea: {
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        },
        inputArea: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 25,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginBottom: 10,
        },
        input: {
          flex: 1,
          fontSize: 16,
        },
        button: {
          backgroundColor: '#5B5C5D',
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
          backgroundColor: '#E8E9EA',
          borderRadius: 10,
          padding: 10,
          marginBottom: 15,
        },
        userMessage: {
          backgroundColor: '#B9DFFC',
          borderRadius: 10,
          padding: 10,
          marginBottom: 15,
          alignSelf: 'flex-end',
        },
        messageText: {
          fontSize: 16,
        },
        typingIndicator: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        },
        typingText: {
          fontSize: 16,
          marginLeft: 10,
        },
      });