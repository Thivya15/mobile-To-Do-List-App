import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditModal from "./src/components/EditModal";
import DeleteModal from "./src/components/DeleteModal";
import ShareView from "./src/components/ShareView";
import { Pressable } from "react-native";

type ToDoType = {
  id: number;
  title: string;
  about: string;
  isDone: boolean;
};

export default function App() {
  const [todo, setTodo] = useState<ToDoType[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoAbout, setTodoAbout] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false); 
  const [editTodo, setEditTodo] = useState<ToDoType | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null); 
  const [showShareView, setShowShareView] = useState(false);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos != null) {
          setTodo(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }, []);

  const addTodo = async () => {
    try {
      if (!todoTitle.trim() || !todoAbout.trim()) return;

      const newTodo: ToDoType = {
        id: Date.now(),
        title: todoTitle.trim(),
        about: todoAbout.trim(),
        isDone: false,
      };

      const updatedTodo = [...todo, newTodo];
      setTodo(updatedTodo);
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodo));
      setTodoTitle("");
      setTodoAbout("");
      Keyboard.dismiss();
    } catch (e) {
      console.error("Error saving todo", e);
    }
  };

  const handleDeletePress = (id: number) => {
    setDeleteTodoId(id);
    setDeleteModalVisible(true);
  };
  
  const confirmDelete = () => {
    if (deleteTodoId !== null) {
      deleteTodo(deleteTodoId);
    }
    setDeleteModalVisible(false);
    setDeleteTodoId(null);
  };
  
  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setDeleteTodoId(null);
  };

  const deleteTodo = async (id: number) => {
    try {
      const newTodo = todo.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodo));
      setTodo(newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (id: number) => {
    try {
      const newTodo = todo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodo));
      setTodo(newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEdit = async (title: string, about: string) => {
    if (!editTodo) return;
    const updatedTodos = todo.map((t) =>
      t.id === editTodo.id ? { ...t, title, about } : t
    );
    setTodo(updatedTodos);
    await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodos));
    setEditTodo(null);
  };

  const handleSharePress = (id: number) => {
    setSelectedId(id);
    setShowShareView(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={todoTitle}
            onChangeText={(title) => setTodoTitle(title)}
            placeholder="Title..."
            placeholderTextColor="#fff"
            style={styles.inputContainer}
          />
          <TextInput
            value={todoAbout}
            onChangeText={(text) => setTodoAbout(text)}
            placeholder="About..."
            placeholderTextColor="#fff"
            style={styles.inputContainer}
          />
        </View>
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Image
            source={require("./src/assets/add.png")}
            style={{ width: 70, height: 70 }}
          />
        </TouchableOpacity>
      </View>

      {todo.length === 0 && (
        <View style={styles.noTaskContainer}>
          <View style={styles.box} />
          <Text style={styles.noTaskText}>No tasks</Text>
          <View style={styles.box2} />
        </View>
      )}


      <FlatList
        data={[...todo].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ToDoItem
            todo={item}
            deleteTodo={deleteTodo}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            handleDone={handleDone}
            onEditPress={() => {
              setEditModalVisible(true);
              setEditTodo(item);
            }}
            handleDeletePress={handleDeletePress}
            handleSharePress={handleSharePress}
          />
        )}
      />

      {/* ✅ Edit Modal */}
      {editTodo && (
        <EditModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSave={handleSaveEdit}
          initialTitle={editTodo.title}
          initialAbout={editTodo.about}
        />
      )}

      {deleteModalVisible && (
        <DeleteModal
          visible={deleteModalVisible}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {showShareView && (
        <Pressable
          style={styles.overlay}
          onPress={() => setShowShareView(false)}
        >
          <ShareView onClose={() => setShowShareView(false)} />
        </Pressable>
      )}


    </SafeAreaView>
  );
}

const ToDoItem = ({
  todo,
  deleteTodo,
  selectedId,
  setSelectedId,
  handleDone,
  onEditPress,
  handleDeletePress,
  handleSharePress
}: {
  todo: ToDoType;
  deleteTodo: (id: number) => void;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  handleDone: (id: number) => void;
  onEditPress: () => void;
  handleDeletePress: (id: number) => void;
  handleSharePress: (id: number) => void;
}) => (
  <TouchableOpacity
    onPress={() => {

      setSelectedId((prev) => (prev === todo.id ? null : todo.id));
    }}
  >
    <View style={styles.todoContainer}>
      <View style={styles.todoInfoContainer}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textDecorationLine: todo.isDone ? "line-through" : "none",
            }}
          >
            {todo.title}
          </Text>
          <Text
            style={{
              color: "#aaa",
              textDecorationLine: todo.isDone ? "line-through" : "none",
            }}
          >
            {todo.about}
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleDeletePress(todo.id)}>

          <Image
            source={require("./src/assets/delete.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </View>
    </View>

    {selectedId === todo.id && (
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => {handleSharePress(todo.id)}}>
          <Image
            source={require("./src/assets/share.png")}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDone(todo.id)}>
          <Image
            source={require("./src/assets/mark.png")}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEditPress}>
          <Image
            source={require("./src/assets/edit.png")}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderRadius: 5,
    paddingBottom: 20,
    marginTop: 40,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
    margin: 10,
  },
  inputContainer: {
    width: 267,
    height: 36,
    backgroundColor: "#1F1E1B",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#FF8303",
    fontSize: 14,
  },
  addButton: {
    justifyContent: "center",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#1B1A17",
  },
  todoContainer: {
    backgroundColor: "#1F1E1B",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF8303",
    gap: 16,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginBottom: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1F1E1B",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  noTaskContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  box: {
    width: 64,
    height: 3,
    backgroundColor: "#FF8303",
    marginBottom: 9,
  },
  box2: {
    width: 64,
    height: 3,
    backgroundColor: "#FF8303",
    marginTop: 10,
  },
  noTaskText: {
    color: "#F0E3CA",
    fontSize: 16,
  },
  
  
});
