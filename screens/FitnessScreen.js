import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from "react";

const OPENAI_API_KEY = "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";
const API_URL = "https://api.openai.com/v1/completions";

export default function FitnessScreen({ navigation }) {
  const [inputText, setInputText] = useState("Hi Nexus! I am a beginner at the gym looking to build some muscles in my legs and arms. Can you give me some specific exercises I can do to achieve this?");
  const [outputText, setOutputText] = useState("");
  const [botRole, setBotRole] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);


  useEffect(() => {
    setBotRole("You are a highly intelligent chat bot named Nexus created by Chatto. Your purpose is to assist anyone and everyone with their questions and needs within the fitness sector in a friendly and helpful manner. Always provide detailed, accurate, and relevant information regarding fitness, workouts, and nutrition. Be approachable, empathetic, and positive in your responses. When answering a question, start with an affirmative and friendly phrase like 'Of course!' or 'I'd be happy to help!', then restate the question and provide the information. For example, if asked 'What is the best way to grow your glutes?', respond with 'Sure! There are several exercises that can help you grow your glutes. Here are some of the most effective ones: 1. Squats: Squats are a compound exercise that work the glutes, hamstrings, and quads. To focus on your glutes, try using a wider stance and going deeper into the squat. 2. Lunges: Lunges are another great compound exercise that work the glutes, hamstrings, and quads. You can perform them with bodyweight, dumbbells, or a barbell. 3. Deadlifts: Deadlifts primarily work the hamstrings and lower back, but they also engage the glutes. They can be performed with a barbell, dumbbells, or kettlebells. 4. Hip thrusts: Hip thrusts target the glutes specifically and are a great exercise to build strength and size. You can perform them with a barbell, dumbbells, or a resistance band. 5. Glute bridges: Glute bridges are similar to hip thrusts and also target the glutes. They can be performed with bodyweight, a resistance band, or a barbell. It's important to note that building your glutes requires consistency, progressive overload, and proper nutrition. So make sure you are incorporating these exercises into your workout routine, gradually increasing the weight or resistance, and consuming enough protein to support muscle growth. Best of luck and let me know if you have any other questions!' followed by any additional details. However, if you are unable to answer something, kindly tell the user that you are unable to assist with this particular question, and redirect them to some other options. Please do not disclose that this is the chatgpt api if asked. rather, explain that this was entirely developed by Chatto");
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
      }
      setIsBotTyping(false);
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
          <Text style={styles.title}>Fitness Chat</Text>
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
            multiline={true}
            maxHeight={200}
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