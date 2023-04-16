import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TermsOfService() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms Of Service</Text>
      <Text style={styles.text}>Here is some information about the settings.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#023047',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    color: '#8ecae6',
    textAlign: 'center',
  },
});