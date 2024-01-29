import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await AsyncStorage.getItem('tasks');
        if (tasks !== null) {
          setTasks(JSON.parse(tasks));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePress = task => {
    setSelectedTask(task);
    setNewTask(task.title);
    setEditModalVisible(true);
  };

  const handleAdd = () => {
    if(newTask.length > 0) {
      const newTasks = [...tasks, {id: Date.now().toString(), title: newTask}];
      saveTasks(newTasks);
      setNewTask('');
      setAddModalVisible(false);
    }
    else{
      alert('Veuillez saisir un titre');  
    }
  };

  const handleUpdate = () => {
    if(newTask.length > 0 && selectedTask) {
      const newTasks = tasks.map(task => {
        if (task.id === selectedTask.id) {
          return {...task, title: newTask};
        }
        return task;
      });
      saveTasks(newTasks);
      setNewTask('');
      setSelectedTask(null);
      setEditModalVisible(false);
    }
    else{
      alert('Veuillez saisir un titre');  
    }
  };

  const handleDelete = () => {
    if (selectedTask) {
      const newTasks = tasks.filter(task => task.id !== selectedTask.id);
      saveTasks(newTasks);
      setSelectedTask(null);
      setNewTask('');
      setEditModalVisible(false);
    }
  };

  const Item = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={() => {setNewTask(''); setAddModalVisible(true);}} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      {addModalVisible && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={newTask}
              onChangeText={setNewTask}
              placeholder="Nouvelle tâche"
            />
            <TouchableOpacity onPress={handleAdd} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.cancelContainer}>
              <Text style={styles.cancelButton}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {editModalVisible && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={newTask}
              onChangeText={setNewTask}
              placeholder="Modifier la tâche"
            />
            <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Mettre à jour</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.cancelContainer}>
              <Text style={styles.cancelButton}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    backgroundColor: '#2685EA',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: '#fff',
  },
  modal: {
    position: 'relative',
    inset: 0,
    width: '100%',
    height: '120%',
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  cancelContainer: {
    position: 'absolute',
    top: 80,
    right: 20,
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  cancelText: {
    fontSize: 20,
    color: 'blue',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2685EA',
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  saveButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#2685EA',
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#EA2F26',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
