import React from 'react';
import { Alert } from 'react-native';

export const AppContext = React.createContext(undefined);
export const useAppContext = () => React.useContext(AppContext);
const inital = {
  todoList: [],
  editTodoItem: null,
  todoName: '',
};

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = React.useState(inital);

  // appState = {todoList: [...], editTodoItem: null, todoName: "todo 1"}
  // setAppState("");
  // appState = "";
  // setAppState(prev => { return ..})

  // güvenli değil ama todo list yazıyorsanız güvenli.
  // soket bağlantısı gibi hızlı data akışı olacak yerlerde bu şekilde kullanılmaması önerilir.
  const mergeState = (newState) => {
    setAppState((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  const saveEditTodo = () => {
    const { editTodoItem, todoName, todoList } = appState;
    const newTodo = { ...editTodoItem, name: todoName, updatedAt: new Date() };
    const newTodoList = todoList.map((todoItem) => {
      if (todoItem.id === newTodo.id) {
        return newTodo;
      }

      return todoItem;
    });

    //
    mergeState({
      todoList: newTodoList,
      editTodoItem: null,
      todoName: '',
    });
  };

  const addTodo = () => {
    const { todoName, todoList } = appState;

    if (todoName.length > 3) {
      const newTodo = {
        id: Math.floor(new Date().getMilliseconds()), // id, zamandiliminden milisaniye düşük değere yuvarlanmış hali.
        name: todoName, // todo adı
        isDone: false, // todo tamamlandımı durumu
        createdAt: new Date(), // oluşturulduğu tarih
        updatedAt: new Date(), // güncellendiği tarih
      };

      // güvenli değil ama todo list yazıyorsanız güvenli.
      // soket bağlantısı gibi hızlı data akışı olacak yerlerde bu şekilde kullanılmaması önerilir.
      mergeState({
        todoList: [newTodo, ...todoList],
        todoName: '',
      });
    } else {
      Alert.alert('Todo Hata!', 'Minimum 3 karakter belirtebilirsiniz.');
    }
  };

  const editTodo = (todo) => {
    mergeState({
      todoName: todo.name,
      editTodoItem: todo,
    });
  };

  const deleteTodo = (todo) => {
    const { todoItem } = appState;
    const newTodoList = todoList.filter((todoItem) => todoItem.id !== todo.id);
    mergeState({ todoList: newTodoList });
  };

  const completeTodo = (todo) => {
    const { todoList } = appState;
    const newTodoList = todoList.map((todoItem) => {
      if (todoItem.id === todo.id) {
        const newTodoItem = {
          ...todoItem,
          isDone: true,
          updatedAt: new Date(),
        };

        return newTodoItem;
      }

      return todoItem;
    });

    mergeState({ todoList: newTodoList });
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
        saveEditTodo,
        addTodo,
        editTodo,
        completeTodo,
        deleteTodo,
        mergeState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
