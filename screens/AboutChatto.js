/** @format */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AboutChatto() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
            <Text style={styles.heading}>About Chatto</Text>
        <Text style={styles.text}>
          Welcome to Chatto, your friendly AI chat companion!
        </Text>

        <Text style={styles.text}>
          Chatto is powered by a highly intelligent software engineer chatbot named Nexus. We utilize the ChatGPT API, engineered by OpenAI, to deliver a unique and friendly chat experience. Our purpose is to assist you with any questions or needs you might have, but more importantly, to serve as a friend.
        </Text>

        <Text style={styles.text}>
          Chatto is designed to make your day better. We aim to provide detailed, accurate, and relevant information while maintaining an approachable, empathetic, and positive tone. Nexus, your chatbot companion, is programmed to ask about your day, your goals, and engage with you in meaningful conversation.
        </Text>

        <Text style={styles.text}>
          Our team is committed to creating a friendly AI. When Nexus answers a question, it starts with an affirmative, friendly phrase, restates the question for clarity, and then provides the information. In case Nexus is unable to answer something, it will kindly tell you and then redirect the conversation to a different topic.
        </Text>

        <Text style={styles.text}>
          We value your privacy and security, so rest assured that your conversations with Nexus are safe and protected.
        </Text>

        <Text style={styles.text}>
          We hope you enjoy your time with Chatto. Happy chatting!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
    textAlign: "center",
  },
  headingTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
});