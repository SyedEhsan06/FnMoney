import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Import Navbar
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'; 
const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const token = localStorage.getItem('token');

  // Fetch todos from the API
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/todo/read', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  // Create or update a todo
  const saveTodo = async (e) => {
    e.preventDefault();
    if (!newTodo) return;

    const endpoint = editingTodo ? `http://localhost:5000/api/todo/update/${editingTodo._id}` : 'http://localhost:5000/api/todo/create';
    const method = editingTodo ? 'put' : 'post';

    try {
      await axios[method](endpoint, {
        data: newTodo,
        isPrivate: false,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewTodo('');
      setIsModalOpen(false);
      setEditingTodo(null);
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id },
      });
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Toggle completed status
  const toggleComplete = async (todo) => {
    try {
      await axios.put(`http://localhost:5000/api/todo/update/${todo._id}`, {
        completed: !todo.completed,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on component mount
  }, []);

  // Filter todos based on search input
  const filteredTodos = todos.filter(todo =>
    todo.data.toLowerCase().includes(search.toLowerCase())
  );

  const completedTodos = filteredTodos.filter(todo => todo.completed);
  const activeTodos = filteredTodos.filter(todo => !todo.completed);

  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {
        loading ?<div className="flex items-center justify-center h-full">
          <BallTriangle
        height={100}
        width={100}
        className="text-center mt-20"
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
        </div> :<div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Todos</h2>

        <div className="flex mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search todos"
            className="border p-2 rounded w-full mr-2"
          />
          <button
            className="bg-green-600 text-white rounded-lg px-4 py-2"
            onClick={() => {
              setIsModalOpen(true);
              setNewTodo('');
            }}
          >
            +
          </button>
        </div>

        {/* Add/Edit Todo Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">{editingTodo ? 'Edit Todo' : 'Add Todo'}</h3>
              <form onSubmit={saveTodo}>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Enter todo"
                  className="border p-2 rounded mb-4 w-full"
                  required
                />
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2" type="submit">
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-300 rounded-lg px-4 py-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Active Todos */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Active Todos</h3>
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="space-y-2">
            {activeTodos.length > 0 ? (
              activeTodos.map(todo => (
                <li key={todo._id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                      className="mr-2"
                    />
                    <span className="text-gray-800">{todo.data}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setEditingTodo(todo);
                        setNewTodo(todo.data);
                        setIsModalOpen(true);
                      }}
                      className="bg-blue-500 text-white rounded-lg px-2 py-1 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="bg-red-500 text-white rounded-lg px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No active todos found.</li>
            )}
          </ul>
        </div>

        {/* Completed Todos */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Completed Todos</h3>
        <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-gray-300 opacity-70">
          <ul className="space-y-2">
            {completedTodos.length > 0 ? (
              completedTodos.map(todo => (
                <li key={todo._id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                      className="mr-2"
                      readOnly
                    />
                    <span className="text-gray-500 line-through">{todo.data}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="bg-red-500 text-white rounded-lg px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No completed todos found.</li>
            )}
          </ul>
        </div>
      </div>
      }
    </div>
  );
};

export default Todos;
