import React from "react";
import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";

const Todolist = ()=>{ 
    const user = useParams('user')
    const nav = useNavigate('null')
    const token = localStorage.getItem('jwt-token');
    const handleSignOut = ()=>{
        localStorage.removeItem('jwt-token');
        nav('/app/login')
    }

    const deleteItem = (e)=>{

        fetch('/api/todolist/delete',{
            method:"POST",
            body:JSON.stringify({
                id:e.target.id
            }),
            headers:{
                'authorization':token,
                'Content-type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.status){
                const deleteItem = document.getElementById(`task-${e.target.id}`)
                document.getElementById('task-container').removeChild(deleteItem)
            }else{
                console.log("error!!! - ",res.err)
            }
        })

    }
    
    const addItem = (e) => {
        const task = document.getElementById('inp').value;
        fetch('/api/todolist/add',{
            method:'POST',
            body:JSON.stringify({
                task:task,
            }),
            headers:{
                'authorization':token,
                'Content-type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            const container = document.getElementById('task-container')
            const newTask = document.createElement('h3')
            newTask.textContent = task
            container.appendChild(newTask)
            document.getElementById('inp').value  = ""
        })
    }

    const fetcher = (url)=>fetch(url,{
        headers:{
            'authorization':token
        }
    }).then(res=>res.json())

    const {data,err,isLoading} = useSWR(`/api/todolist/`,fetcher)

    if(err){
        return(
            <div>
                error
            </div>
        )
    }
    
    if(isLoading){
        return(
            <div>
                loading
            </div>
        )
    }

    if(data.status){
        const user = data.user.username
        console.log(data.tasks)
        return(
            <div>
                Todolist
                <div className="container" id="container">
                    <div className="tasks-container" id="task-container">
                        {data.tasks.map((task, index) => (
                            <div className="tasks" id={`task-${task.id}`} key={index} >
                                <h3  id={task.id} className="task">{task.task}</h3> 
                                <button id={task.id} onClick={deleteItem} >delete</button>
                            </div>
                        ))}
                    </div>
                    <div className="input" id="listInput">
                        <input type="text" id="inp" />
                        <button className="btn" onClick={addItem} > add </button>
                    </div>
                </div>
                <button onClick={handleSignOut} >Sign out</button>
            </div>
        )
    }
    else if(data.status==false){
        nav('/app/login')
        return(
            <div>
                not authorized {data.message}
                <button onClick={handleSignOut} >Login Again</button>
            </div>
        )
    }
}


export default Todolist
