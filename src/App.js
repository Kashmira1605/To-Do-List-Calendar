import { useState } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import Time from './Time.js';

function App() {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [todos, setTodos] = useState({});
  const [currentTodo, setCurrentTodo] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);

  const handleTodoChange = (event) => {
    setCurrentTodo(event.target.value);
  };

  const handleTimeChange = (event) => {
    setCurrentTime(event.target.value);
  };

  const handleTodoSubmit = (event) => {
    event.preventDefault();
    const todo = `${currentTodo} (${currentTime})`;
    const currentTodos = todos[date.toDateString()] || [];
    setTodos({ ...todos, [date.toDateString()]: [...currentTodos, todo] });
    setCurrentTodo('');
    setCurrentTime('');
  };

  const handleDeleteTodo = (index) => {
    const currentTodos = todos[date.toDateString()] || [];
    const updatedTodos = currentTodos.filter((todo, i) => i !== index);
    setTodos({ ...todos, [date.toDateString()]: updatedTodos });
  };

  const handleEditTodo = (index) => {
    setSelectedTodoIndex(index);
    setCurrentTodo(todos[date.toDateString()][index].split(' ')[0]);
    setCurrentTime(todos[date.toDateString()][index].split(' ')[1].slice(1, -1));
  };

  const handleUpdateTodo = (event) => {
    event.preventDefault();
    const todo = `${currentTodo} (${currentTime})`;
    const currentTodos = todos[date.toDateString()] || [];
    const updatedTodos = [...currentTodos];
    updatedTodos[selectedTodoIndex] = todo;
    setTodos({ ...todos, [date.toDateString()]: updatedTodos });
    setSelectedTodoIndex(null);
    setCurrentTodo('');
    setCurrentTime('');
  };

  return (
    <div className='app'>
      <h1 className='header'>React Calendar</h1>
      <div>
        <Calendar onChange={setDate} value={date} onClickDay={() => setShowTime(true)} />
      </div>
      {date.length > 0 ? (
        <p>
          <span>Start:</span> {date[0].toDateString()} <span>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p>
          <span>Default selected date:</span> {date.toDateString()}
        </p>
      )}
      <Time showTime={showTime} date={date} />
      <form onSubmit={selectedTodoIndex !== null ? handleUpdateTodo : handleTodoSubmit}>
        <label>
          Enter your task for {date.toDateString()}:
          <input type='text' value={currentTodo} onChange={handleTodoChange} />
        </label>
        <label>
          Time:
          <input type='time' value={currentTime} onChange={handleTimeChange} />
        </label>
        <button type='submit'>{selectedTodoIndex !== null ? 'Update task' : 'Add task'}</button>
        {selectedTodoIndex !== null && (
          <button type='button' onClick={() => setSelectedTodoIndex(null)}>
            Cancel
          </button>
        )}
      </form>
      {todos[date.toDateString()] && (
      <div>
        <h2>Tasks for {date.toDateString()}</h2>
        <ul>
          {todos[date.toDateString()].map((todo, index) => (
          <li key={index}>
      {todo}
      <button onClick={() => handleEditTodo(index)}>Edit</button>
      <button onClick={() => handleDeleteTodo(index)}>Delete</button>
      </li>
      ))}
      </ul>
      </div>
      )}
      </div>
      );
      }

export default App;
