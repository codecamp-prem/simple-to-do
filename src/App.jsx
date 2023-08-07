import { useState } from 'react'
import './App.css'
import { TodoItem } from './TodoItem'

function App() {
  const [newTodoName, setNewTodoName] = useState("")
  const [todos, setTodos] = useState([])

  function addNewToDo(){
    // check for empty string
    if (newTodoName.trim() === "") return

    setTodos(currentTodos => {
      return [...currentTodos, {name: newTodoName.trim(), completed: false, id: crypto.randomUUID()}]
    })
    // after adding, clear the text box
    setNewTodoName("")
  }

  function toggleTodo(todoId, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === todoId) return {...todo, completed}
        return todo // else return todo element doing nothing
      })
    })
  }

  function deleteTodo(todoId){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== todoId)
    })
  }

  return (
    <>
      <ul id="list">
        {todos.map(todo => {
          // pass every thing need in component even functions
          return <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        })}
      </ul>
      
      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" value={newTodoName} onChange={e => setNewTodoName(e.target.value)}/>
        <button onClick={addNewToDo}>Add Todo</button>
      </div>
    </>
  )
}

export default App
