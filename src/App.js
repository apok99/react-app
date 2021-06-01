import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './Components/api';

function App() {

  const [users, setUsers] = useState([]); 
  const [cols, setCols] = useState([{'Header':'id', 'Accesor' : 'id'},{'Header':'Name', 'Accesor' : 'name'}, {'Header':'Username', 'Accesor' : 'username'}, {'Header':'Email', 'Accesor' : 'email'}]);
  const [objectKeys, setObjectKeys] = useState(['id','name','username','email']);
  const [usersCopy, setUsersCopy] = useState([]); 

  useEffect(() => {
    axios.get(api+'users').then((res) => {
      setUsers(res.data);
      setUsersCopy(res.data);
    })
  }, [])

  const loadColums = () => {
    return (cols.map((col, i) => {
        return (
          <td>{col.Header}</td> 
        )
    }));
  }
  
  const loadValues = () => {
    return (usersCopy.map((user, i) =>{
      return (
        <tr>
            {objectKeys.map((key) => {
                return (
                  <td>{user[key]}</td>
                )
              })
            }
        </tr>        
      )
    }));
  }

  const filter = (filter) => {
    setUsersCopy([]);
    let arrayTemp = [];
    let arrayIds = [];
    users.forEach((user, i) => {
      objectKeys.forEach(key => {
        //El error se producia al final por que habia que indicarle que es un String obligatorio
        if (String(user[key]).toUpperCase().includes(String(filter.toUpperCase()))) {
          if (!arrayIds.includes(user.id)) {
              arrayTemp.push(user);
              arrayIds.push(user.id);
          }
        }
      })
    }) 
    setUsersCopy(arrayTemp);
  }

  return (
    <div className="App">
      <input onKeyUp={(e) => filter(e.target.value)}></input>
      <table>
        <thead>
          <tr>
          {loadColums()}       
          </tr>
        </thead>
        <tbody>
          {loadValues()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
