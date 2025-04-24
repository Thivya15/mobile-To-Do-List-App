import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteModal({ visible, onConfirm, onCancel }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.view}>
            <View style={styles.column}>
              <View style={styles.box} />
              <View style={styles.view2}>
                <Text style={styles.text}>{"Delete this task?"}</Text>
              </View>
              <View style={styles.view3}>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.button} onPress={onConfirm}>
                    <Text style={styles.text2}>{"Yes"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button2} onPress={onCancel}>
                    <Text style={styles.text2}>{"No"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  box: {
    width: 281,
    height: 4,
    backgroundColor: "#A35709",
    marginBottom: 33,
  },
  button: {
    backgroundColor: "#242320",
    borderColor: "#A35709",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 20,
    marginLeft: 50,
  },
  button2: {
    backgroundColor: "#242320",
    borderColor: "#FF8303",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  column: {
    alignItems: "flex-start",
    backgroundColor: "#1B1A17",
    borderRadius: 4,
    paddingBottom: 13,
    
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#1B1A17",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    alignItems: 'center',
    paddingLeft: 50,
  },
  text2: {
    color: "#D9D9D9",
    fontSize: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  view: {
    alignItems: "center",
    backgroundColor: "#070707E0",
    paddingVertical: 350,
  },
  view2: {
    alignItems: "center",
    marginBottom: 42,
  },
  view3: {
    alignItems: "center",
  },
});
