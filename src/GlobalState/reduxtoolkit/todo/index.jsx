// src/App.js
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const initialState = []

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action) {
      return action.payload
    },
    addTodo(state, action) {
      state.push(action.payload)
    },
    updateTodo(state, action) {
      const { id, text } = action.payload
      const existingTodo = state.find((todo) => todo.id === id)
      if (existingTodo) {
        existingTodo.text = text
      }
    },
    deleteTodo(state, action) {
      const { id } = action.payload
      return state.filter((todo) => todo.id !== id)
    },
  },
})

const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions

const todoReducer = todoSlice.reducer

// src/app/store.js

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
})

const Todo = () => {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)

  const handleAdd = () => {
    if (editId) {
      dispatch(updateTodo({ id: editId, text: input }))
      setEditId(null)
    } else {
      dispatch(addTodo({ id: Date.now(), text: input }))
    }
    setInput('')
  }

  const handleEdit = (todo) => {
    setInput(todo.text)
    setEditId(todo.id)
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo({ id }))
  }

  // 假设这是传入的局部变量数组
  const initialTodos = [
    { id: 1, text: 'Learn Redux' },
    { id: 2, text: 'Learn Redux Toolkit' },
  ]

  const handleSetTodos = () => {
    dispatch(setTodos(initialTodos))
  }

  return (
    <div className='h-screen w-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
        <button
          onClick={handleSetTodos}
          className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
        >
          Set Initial Todos
        </button>
        <div className='mb-4'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full p-2 border rounded mb-2'
            placeholder='Enter todo'
          />
          <button
            onClick={handleAdd}
            className='bg-green-500 text-white px-4 py-2 rounded w-full'
          >
            {editId ? 'Update' : 'Add'}
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className='flex justify-between items-center bg-gray-100 p-2 rounded mb-2 text-black'
            >
              {todo.text}
              <div>
                <button
                  onClick={() => handleEdit(todo)}
                  className='bg-yellow-500 text-white px-2 py-1 rounded mr-2'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const TodoDemo = () => {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  )
}
export default TodoDemo
