import { useEffect, useState } from 'react';
import './App.css';

import { TodoProvider } from './contexts';
import Header from './components/Header/header';
import Form from './components/Form/Form';
import Todoitems from './components/Todoitems/Todoitems';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos?.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, todo: updatedTodo } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsLogin(true);
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <>
      {isLogin ? (
        <TodoProvider
          value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted ,setIsLogin}}
        >
          <Header />
          <div>
            <Form />
          </div>
          <div className="todolist">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <Todoitems todo={todo} />
              </div>
            ))}
          </div>
        </TodoProvider>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <form onSubmit={handleSignIn}>
            
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // style={{ marginTop: '1rem' }}
            />
            <button type="submit" style={{ marginTop: '1rem' }}>
              Sign In
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
