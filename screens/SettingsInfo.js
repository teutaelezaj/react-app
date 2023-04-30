/** @format */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function SettingsInfo() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* <Text style={styles.title}>Settings Info</Text> */}
        <Text style={styles.headingTitle}>Privacy Policy for Chatto</Text>

        <Text style={styles.heading}>Information We Collect</Text>
        <Text style={styles.text}>
          When you use the App's chatbot feature, we may collect information
          that you provide to us, such as your name, email address, phone
          number, and any other information that you voluntarily provide through
          the chatbot conversation. We also collect information about your
          interactions with the chatbot, including the questions you ask and the
          responses you receive. In addition, we may collect certain technical
          information about your device, such as your device type, operating
          system, and IP address. We may use cookies and other similar tracking
          technologies to collect this information.
        </Text>

        <Text style={styles.heading}>How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the information we collect to provide and improve the chatbot
          feature in the App. Specifically, we use your information to: -
          Respond to your inquiries and provide support - Analyze and improve
          the chatbot feature and our services - Send you updates and
          promotional materials related to the chatbot feature and our services
          - Comply with legal obligations We may also share your information
          with third-party service providers who assist us with providing the
          chatbot feature and our services. These service providers are
          authorized to use your information only as necessary to provide
          services to us. In addition, we may disclose your information if we
          are required to do so by law or in response to a subpoena or court
          order.
        </Text>

        <Text style={styles.heading}>Data Retention</Text>
        <Text style={styles.text}>
          We will retain your information for as long as necessary to fulfill
          the purposes outlined in this Privacy Policy, unless a longer
          retention period is required or permitted by law.
        </Text>

        <Text style={styles.heading}>Security</Text>
        <Text style={styles.text}>
          We take reasonable measures to protect your information from
          unauthorized access, disclosure, or misuse. However, no security
          measure is perfect, and we cannot guarantee the security of your
          information.
        </Text>

        <Text style={styles.heading}>Children's Privacy</Text>
        <Text style={styles.text}>
          The App is not intended for use by children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          you are a parent or guardian and believe that your child has provided
          us with personal information, please contact us immediately.
        </Text>

        <Text style={styles.heading}>Changes to this Privacy Policy</Text>
        <Text style={styles.text}>
          We may update this Privacy Policy from time to time. If we make
          material changes to this Privacy Policy, we will notify you by email
          or by posting a notice in the App prior to the effective date of the
          changes. Your continued use of the App after the effective date of the
          changes constitutes your acceptance of the updated Privacy Policy.
        </Text>

        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at [insert contact information].
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
