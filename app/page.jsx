"use client"

import { useState, useEffect } from "react"

function TodoApp() {

  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {

    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo() {

    if (text.trim() != "") {

      const newTodo = {
        todo: text,
        completed: false,
        id: Date.now()
      }

      const newTodoArr = [...todos, newTodo]

      setTodos(newTodoArr)
    }
  }

  function deleteTodo(id) {

    const updatedTodoArr = []

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id !== id) {
        updatedTodoArr.push(todos[i])
      }
    }

    setTodos(updatedTodoArr)
  }

  function toggleTodo(id) {

    const updatedTodoArr = []

    for (let i = 0; i < todos.length; i++) {

      if (todos[i].id == id) {
        updatedTodoArr.push({ ...todos[i], completed: !todos[i].completed })
      }
      else {
        updatedTodoArr.push(todos[i])
      }
    }

    setTodos(updatedTodoArr)
  }

  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const pendingTodos = totalTodos - completedTodos;

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 text-gray-800">

      {/* Input Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Coding Junior Todo Task
        </h1>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your todo..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-3
                 text-gray-900 bg-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addTodo}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                 hover:bg-blue-700 transition duration-200 font-medium"
        >
          Add Todo
        </button>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Total Todos: <span className="font-bold">{totalTodos}</span>
        </h2>

        <h2 className="text-green-600 font-semibold">
          Completed: {completedTodos}
        </h2>

        <h2 className="text-red-600 font-semibold">
          Pending: {pendingTodos}
        </h2>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-md space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h3
                className={`font-semibold text-gray-900 ${todo.completed ? "line-through text-gray-400" : ""
                  }`}
              >
                {todo.todo}
              </h3>

              <p
                className={`text-sm ${todo.completed ? "text-green-600" : "text-red-500"
                  }`}
              >
                {todo.completed ? "Completed" : "Incomplete"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

              <button
                onClick={() => toggleTodo(todo.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
              >
                Toggle
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>


  )
}

export default TodoApp