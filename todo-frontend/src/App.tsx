
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { WelcomePage } from './components/WelcomePage';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/view-todo" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
