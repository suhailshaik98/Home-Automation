import { useState } from "react"
import './todo.css'

export const ToDo = () => {
     
    const [toDoItem , setToDoItem] = useState('')
    const [toDoItems, setToDoItems] = useState([])

    // adds a new todo item
    const handleCreateToDo = () => {
        setToDoItems([...toDoItems, {value: toDoItem, id: toDoItems.length}])
        setToDoItem('')
    }

    // if you are done with an item just click on it to delete it
    const handleDeleteToDo = (id) => {
        let updatedList = toDoItems.filter(item => item.id != id)
        setToDoItems(updatedList)
    }
    return (
    <>
    <div className="input-wrapper">
        <input className="input" type="text" value={toDoItem} name="todo" placeholder="create a new todo" onChange={(e) => setToDoItem(e.target.value) } />
        <button className="add-button" onClick={handleCreateToDo} >Add New ToDo</button>
    </div>
    
    {toDoItems.map(item => <div onClick={() => handleDeleteToDo(item.id)}>{item.value}</div>)}
    
    </>
    )
}