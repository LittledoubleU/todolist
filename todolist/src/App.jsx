import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

// import TodoList from "./components/todolist"

function App() {
    // default value
    const [todos, setTodos] = useState([])
    const [todoValue, setTodoValue] = useState('')

    function persistData(newList) {
        localStorage.setItem('todos', JSON.stringify({ todos: newList }))
    }

    function handleAddTodos(newTodo) {
        const newTodoList = [...todos, newTodo];
        persistData(newTodoList)
        setTodos(newTodoList)
    }

    function handleDeleteTodo(index) {
        const newTodoList = todos.filter((todos, todoIndex) => {
            return todoIndex !== index
        })
        persistData(newTodoList)
        setTodos(newTodoList)
    }

    function handleEditTodo(index) {
        const valueToBeEdited =  todos[index]
        setTodoValue(valueToBeEdited)
        handleDeleteTodo(index)
    }

    useEffect(() => {
        if (!localStorage) {
            return
        }

        let localTodos = localStorage.getItem('todos')
        if (!localTodos) {
            return
        }
        localTodos = JSON.parse(localTodos).todos
        setTodos(localTodos)

    }, [])

    return (
        <main>
            <section>
                <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
                <div className="container scrollbar">
                    <div className='wrapper'>
                        <TodoList handleDeleteTodo={handleDeleteTodo} todos={todos} handleEditTodo={handleEditTodo}/>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default App