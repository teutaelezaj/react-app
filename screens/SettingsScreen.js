import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>General Information</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SettingsInfo')}>
        <Text style={styles.option}>Privacy Policy</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
        <Text style={styles.option}>Terms Of Service</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ChatRules')}>
        <Text style={styles.option}>Chat Rules</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SettingsScreen;

