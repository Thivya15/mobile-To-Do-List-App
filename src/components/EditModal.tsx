import React, { useState, useEffect } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type EditModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, about: string) => void;
  initialTitle: string;
  initialAbout: string;
};

export default function EditModal({
  visible,
  onClose,
  onSave,
  initialTitle,
  initialAbout,
}: EditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [about, setAbout] = useState(initialAbout);

  useEffect(() => {
    setTitle(initialTitle);
    setAbout(initialAbout);
  }, [initialTitle, initialAbout]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.view}>
            <View style={styles.column}>
              <TextInput
                placeholder={"Mini Input..."}
                //value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholderTextColor="#F0E3CA"
              />
              <TextInput
                placeholder={"Max Input..."}
                //value={about}
                onChangeText={setAbout}
                style={styles.input2}
                placeholderTextColor="#F0E3CA"
              />
              <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => {
                    onSave(title, about);
                    onClose();
                  }}
                >
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    backgroundColor: "#1B1A17",
  },
  view: {
    backgroundColor: "#070707E0",
    paddingTop: 393,
  },
  column: {
    backgroundColor: "#1B1A17",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 18,
    marginHorizontal: 15,
  },
  input: {
    width: 324,
    color: "#F0E3CA",
    fontSize: 14,
    marginBottom: 8,
    backgroundColor: "#242320",
    borderColor: "#A35709",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 7,
    paddingLeft: 9,
    paddingRight: 18,
  },
  input2: {
    textAlignVertical: 'top',
    justifyContent:'flex-start',
    textAlign: 'left',
    width: 324,
    height: 275,
    color: "#F0E3CA",
    fontSize: 14,
    marginBottom: 8,
    backgroundColor: "#242320",
    borderColor: "#A35709",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 8,
    paddingLeft: 9,
    paddingRight: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "#242320",
    borderColor: "#A35709",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginRight: 12,
  },
  button2: {
    backgroundColor: "#242320",
    borderColor: "#A35709",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  text: {
    color: "#D9D9D9",
    fontSize: 10,
  },
  
});
