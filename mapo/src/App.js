

import React, { useEffect, useState } from 'react';
import {AiOutlineDelete} from'react-icons/ai'
import { FaCheck } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import './App.css';
function App() {
  const [iscs,setcs]=useState(false);
  const[alltodos,settodos]=useState([]);
  const[newtitle,setnewtitle]=useState("");
  const[newdescription,setnewdescription]=useState("");
  const[completedtodos,setcompletedtodos]=useState([]);
  const [currentedit, setcurrentedit] = useState(null); 
  const [currentediteditem, setcurrentediteditem] = useState({ title: "", description: "" });
  const handleaddtodolist = ()=>{
    let newtodoitem ={
      title:newtitle,
      description:newdescription,
    }
    let updatetodoarr = [...alltodos];
    updatetodoarr.push(newtodoitem);
    settodos(updatetodoarr);
    localStorage.setItem('todolist',JSON.stringify(updatetodoarr))
  }
  useEffect(()=>{
    let savedtodo = JSON.parse(localStorage.getItem('todolist'));
    let savedcompletedtodo = JSON.parse(localStorage.getItem('completedtodos'));
    if (savedtodo){
      settodos(savedtodo);
    }
    if (savedcompletedtodo){
      setcompletedtodos(savedcompletedtodo);
    }
  },[])
  const deleteitem = (index) =>{
    let r=[...alltodos];
    r.splice(index,1);
   
    localStorage.setItem('todolist',JSON.stringify(r))
    settodos(r);
    
  }
  const deleteitemcompleted = (index) =>{
    let r=[...completedtodos];
    r.splice(index,1);
   
    localStorage.setItem('completedtodos',JSON.stringify(r))
    setcompletedtodos(r);
    
  }
 
  const handlecomplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm =now.getMonth()+1;
    let yy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
   
    let s = now.getSeconds();  
    let completedon = dd +'-'+mm+'-'+yy+' at '+h+':'+m+':'+s;
    let filtered = {
     ...alltodos[index],
     completedon:completedon,
    }
    let updatedcompletedarr = [...completedtodos];
    updatedcompletedarr.push(filtered);
    setcompletedtodos(updatedcompletedarr);
    deleteitem(index);
    localStorage.setItem('completedtodos',JSON.stringify(updatedcompletedarr));
  }
 

const handleedit = (index, item) => {
  setcurrentedit(index);
  setcurrentediteditem(item); 
};

const handleupdatetitle = (value) => {
  setcurrentediteditem({ ...currentediteditem, title: value }); 
};

const handleupdatedescription = (value) => {
  setcurrentediteditem({ ...currentediteditem, description: value }); 
};
const handleupdateitem = () => {
  const updatedTodos = [...alltodos];
  updatedTodos[currentedit] = currentediteditem; 
  settodos(updatedTodos);
  localStorage.setItem('todolist', JSON.stringify(updatedTodos)); 
  setcurrentedit(null); 
  setcurrentediteditem({ title: "", description: "" }); 
};
  return (
    <div className='app'>
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newtitle} onChange={(e)=>setnewtitle(e.target.value)} placeholder="what's the task title ?"></input>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newdescription} onChange={(e)=>setnewdescription(e.target.value) }placeholder="what's the task description ?"></input>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleaddtodolist} className='primaryBtn'>Add</button>
          </div>
        </div>
        
        <div className='btn-area'>
        <button className={`secondaryBtn ${iscs === false ? 'active' : ''}`} onClick={()=>setcs(false)}>Todo</button>
        <button className={`secondaryBtn ${iscs === true ? 'active' : ''}`} onClick={()=>setcs(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          { iscs === false && alltodos.map((item,index)=>{
            if (currentedit === index )
              {return(
              <div className='edit_wrapper' key={index}>
                <input placeholder='updated title'  onChange = {(e)=>handleupdatetitle(e.target.value)} value={currentediteditem.title} />
                <textarea placeholder='updated title' rows={4} onChange = {(e)=>handleupdatedescription(e.target.value)} value={currentediteditem.description} />
                
            <button type='button' onClick={handleupdateitem} className='primaryBtn'>Update</button>

                </div>)
            } 
            else{
              return(
                <div className='todo-list-item' key={index}>
              <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
            <div>
            <AiOutlineDelete className='icon' onClick={()=>deleteitem(index)}></AiOutlineDelete>
            <FaCheck className='check-icon' onClick={()=>{handlecomplete(index)}}></FaCheck>
            <MdOutlineEdit className='check-icon' onClick={()=>{handleedit(index,item)}}/>
            </div>
            </div>
              )
            }
            
          })}
           { iscs === true && completedtodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><small>Completed on: {item.completedon}</small></p>
          </div>
          <div>
          <AiOutlineDelete className='icon' onClick={()=>deleteitemcompleted(index)}></AiOutlineDelete>
          
          </div>
          </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default App;


