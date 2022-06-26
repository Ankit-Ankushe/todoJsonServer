import './App.css';
import React from 'react';

const Todo = () =>{
  const [input,SetInput] = React.useState("");
  const [todo,SetTodo] = React.useState([]);

  const getTodos=()=>{
    fetch(`http://localhost:3001/todos`)
  .then((res)=>res.json())
  .then((res) => SetTodo(res))
  .catch((err)=> console.log(err))
  }
  const addTodo = (title) => {
    const data = {
      title: title,
      status: false
    }
    fetch(`http://localhost:3001/todos`,{
      method:"POST",
      body: JSON.stringify(data),
      headers:{
        "content-type": "application/json"
      }
    }).then((res) => res.json())
    .then((res) => {getTodos()})
  }
 React.useEffect(()=>{
  getTodos()
 },[]);
//  console.log("todos" , todo)
  return(
    <div>
    <h1>Todo</h1>
    <input type="text" placeholder='enter todo' value={input} onChange={(e)=>SetInput(e.target.value)} />
    <button onClick={()=>addTodo(input)}>ADD</button>
    <br />
    {
      
      todo.map((e)=>(
        <div key={e.id}>
          <h1>{e.title}</h1>
        </div>
      ))
    }
    </div>
  ) 
}

function App() {
  return (
    <div className="App">
      <Todo/>
    </div>
  );
}

export default App;
