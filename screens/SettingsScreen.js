/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { InAppReview } from "react-native-in-app-review";
import { Linking, Platform } from 'react-native';
const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isReviewAvailable, setIsReviewAvailable] = useState(false);

  useEffect(() => {
    const checkReviewAvailability = async () => {
      try {
        const isAvailable = await InAppReview.isAvailable();
        setIsReviewAvailable(isAvailable);
      } catch (error) {
        console.log(error);
      }
    };
    checkReviewAvailability();
  }, []);

  const handleReviewButtonPress = async () => {
    try {
      await InAppReview.requestReview();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxView}>
        <View style={styles.subView}>
          <Feather
            name="share"
            size={20}
            color="white"
            style={styles.iconStyle}
          />
          <Text style={styles.option}>Share Chatto</Text>
        </View>
      </View>
      <View style={styles.boxView}>
        {/* <View style={styles.subView}>
          <FontAwesome
            name="twitter-square"
            size={20}
            color="#00acee"
            style={styles.iconStyle}
          />
          <TouchableOpacity onPress={() => navigation.navigate("SettingsInfo")}>
            <Text style={styles.option}>Follow Us on Twitter</Text>
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.dividerView} />
        <View style={styles.subView}>
          <FontAwesome
            name="reddit-square"
            size={20}
            color="#ff4500"
            style={styles.iconStyle}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("TermsOfService")}
          >
            <Text style={styles.option}>Follow Us on Reddit</Text>
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.dividerView} /> */}
        <View style={styles.subView}>
          <AntDesign
            name="star"
            size={20}
            color="white"
            style={styles.iconStyle}
          />
          <TouchableOpacity
            // style={styles.boxView}
            onPress={handleReviewButtonPress}
          >
            <Text style={styles.option}>Like Us? Rate Us!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerView} />
        <View style={styles.subView}>
          <MaterialCommunityIcons
            name="owl"
            size={20}
            color="white"
            style={styles.iconStyle}
          />
          <TouchableOpacity
            // style={styles.boxView}
            onPress={() => navigation.navigate("AboutChatto")}
          >
            <Text style={styles.option}>About Chatto</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.boxView}>
      <View style={styles.subView}>
  <MaterialIcons
    name="email"
    size={20}
    color="white"
    style={styles.iconStyle}
  />
<TouchableOpacity onPress={async () => {
  const email = 'chatto@gmail.com';
  const url = `mailto:${email}`;

  if (Platform.OS === 'web') {
    window.open(url, '_blank');
  } else {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      // If device can't handle mailto: scheme, show a message
      Alert.alert(
        "Email Not Supported",
        "Please manually send an email to: " + email,
        [{ text: "OK" }]
      );
    } else {
      try {
        await Linking.openURL(url);
      } catch (error) {
        Alert.alert("An error occurred", "Please try again later", [{ text: "OK" }]);
      }
    }
  }
}}>
  <Text style={styles.option}>Email Support</Text>
</TouchableOpacity>

</View>
      </View>
      <View style={styles.boxView}>
        <View style={styles.subView}>
          <Ionicons
            name="shield-checkmark"
            size={20}
            color="white"
            style={[styles.iconStyle, { fontWeight: "bold" }]}
          />

          <TouchableOpacity onPress={() => navigation.navigate("SettingsInfo")}>
            <Text style={styles.option}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerView} />
        <View View style={styles.subView}>
          <MaterialIcons
            name="assignment-turned-in"
            size={20}
            color="white"
            style={[styles.iconStyle, { fontWeight: "bold" }]}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("TermsOfService")}
          >
            <Text style={styles.option}>Terms Of Service</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerView} />
        <View View style={styles.subView}>
          <Entypo
            name="chat"
            size={20}
            color="white"
            style={[styles.iconStyle, { fontWeight: "bold" }]}
          />

          <TouchableOpacity onPress={() => navigation.navigate("ChatRules")}>
            <Text style={styles.option}>Chat Rules</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#000000",
  },
  title: {
    // textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    alignItems: "center",
    // alignSelf: "center",
  },
  option: {
    fontSize: 18,
    lineHeight: 50,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
  },
  boxView: {
    backgroundColor: "#272521",
    justifyContent: "center",
    width: "90%",
    // height: "8%",
    margin: 10,
    borderRadius: 16,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#272521",
    alignItems: "center",
  },
  dividerView: {
    backgroundColor: "black",
    width: "100%",
    height: 1.5,
  },
  subView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  iconStyle: { marginRight: "3%", alignSelf: "center" },
});

export default SettingsScreen;
