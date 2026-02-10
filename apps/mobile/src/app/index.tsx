import { StyleSheet, ScrollView, View, Text, StatusBar } from "react-native";
import { sample } from "@template/core";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.textLg}>Hello there,</Text>
          <Text style={[styles.textXL, styles.appTitleText]} testID="heading" role="heading">
            Welcome Mobile
          </Text>

          <Text>Sample Library Utilization: {sample()}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  scrollView: {
    backgroundColor: "#ffffff"
  },
  section: {
    marginVertical: 12,
    marginHorizontal: 12
  },
  textLg: {
    fontSize: 24
  },
  textXL: {
    fontSize: 48
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: "500"
  }
});
