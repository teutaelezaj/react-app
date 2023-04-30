/** @format */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ChatRules() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headingTitle}>Chat Rules for Chatto</Text>
        <Text style={styles.text}>
          Welcome to Chatto! We want to make sure that our chatbot feature is a
          fun and safe place for everyone. To ensure that, we have created these
          Chat Rules to guide you in your interactions with the chatbot. By
          using the chatbot feature, you agree to abide by these Chat Rules.
        </Text>

        <Text style={styles.heading}>Be respectful</Text>
        <Text style={styles.text}>
          Please be respectful in your interactions with the chatbot. Do not use
          inappropriate language, make offensive comments, or engage in any form
          of harassment or discrimination.
        </Text>

        <Text style={styles.heading}>Stay on topic</Text>
        <Text style={styles.text}>
          The chatbot is designed to assist you with specific topics related to
          the App. Please keep your questions and comments related to the App
          and avoid discussing irrelevant topics.
        </Text>

        <Text style={styles.heading}>Do not share personal information</Text>
        <Text style={styles.text}>
          For your own safety and privacy, please do not share any personal
          information, such as your full name, address, phone number, or email
          address, with the chatbot.
        </Text>

        <Text style={styles.heading}>Do not promote or advertise</Text>
        <Text style={styles.text}>
          Do not promote or advertise any products, services, or websites in
          your interactions with the chatbot.
        </Text>

        <Text style={styles.heading}>Do not impersonate</Text>
        <Text style={styles.text}>
          Do not impersonate any person or entity or falsely represent your
          affiliation with any person or entity in your interactions with the
          chatbot.
        </Text>

        <Text style={styles.heading}>Report any inappropriate behavior</Text>
        <Text style={styles.text}>
          If you witness or experience any behavior that violates these Chat
          Rules or makes you uncomfortable, please report it to us immediately.
        </Text>

        <Text style={styles.heading}>Disclaimer</Text>
        <Text style={styles.text}>
          The chatbot feature is intended to provide general information and
          assistance related to the App. It is not intended to provide medical,
          legal, or financial advice, and should not be relied upon as such.
          Please consult a professional in the appropriate field for any
          specific advice or information.
        </Text>

        <Text style={styles.heading}>Monitoring and Enforcement</Text>
        <Text style={styles.text}>
          We reserve the right to monitor your interactions with the chatbot and
          to remove any content that violates these Chat Rules. We may also take
          appropriate legal action against anyone who violates these Chat Rules.
        </Text>

        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about these Chat Rules, please
          contact us at [insert contact information].
        </Text>
      </ScrollView>
    </View>
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
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
  text: {
    fontSize: 18,
    color: "#ffff",
    marginBottom: 20,
    textAlign: "center",
  },
  bullet: {
    fontSize: 18,
    color: "#ffff",
    marginBottom: 20,
    textAlign: "left",
    paddingLeft: 15,
  },
});
