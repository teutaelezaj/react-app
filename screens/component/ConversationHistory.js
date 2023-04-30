/** @format */

import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ConversationHistory = ({ conversationHistory }) => {
  // Split the conversation history into an array of question-answer pairs
  const pairs = conversationHistory.split("\n");

  // Group the pairs by the speaker (human or bot)
  const groupedPairs = pairs.reduce((acc, pair) => {
    const speaker = pair.startsWith("Human:") ? "human" : "bot";
    const message = pair.replace(/(Human|Bot): /, "");
    const prevGroup = acc.length > 0 ? acc[acc.length - 1] : null;
    if (prevGroup && prevGroup.speaker === speaker) {
      // If the previous message was from the same speaker, add to the existing group
      prevGroup.messages.push(message);
    } else {
      // Otherwise, create a new group
      acc.push({ speaker, messages: [message] });
    }
    return acc;
  }, []);

  return (
    <View style={styles.container}>
      {groupedPairs.map((group, index) => (
        <View key={index} style={styles.chatBubbleContainer}>
          {group.speaker === "human" ? (
            <View style={[styles.chatBubble, styles.humanChatBubble]}>
              {group.messages.map((message, index) => (
                <Text key={index} style={styles.chatBubbleText}>
                  {message}
                </Text>
              ))}
            </View>
          ) : (
            <View style={[styles.chatBubble, styles.botChatBubble]}>
              {group.messages.map((message, index) => (
                <Text key={index} style={styles.chatBubbleText}>
                  {message}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chatBubbleContainer: {
    marginBottom: 10,
  },
  chatBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
  },
  humanChatBubble: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },
  botChatBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  chatBubbleText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ConversationHistory;
