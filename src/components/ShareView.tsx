import React from "react";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";

export default ({ onClose }: { onClose: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shareBox}>
        <Image
          source={require("../assets/shareBox.png")}
          resizeMode={"stretch"}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1A17",
    justifyContent: "flex-end", 
  },
  shareBox: {
    backgroundColor: "#070707E0",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: "center", 
  },
  image: {
    width: 320,
    height: 48,
  },
});
