import './App.css';
import React, { useEffect, useState } from 'react';
import loadUsers from './Components/dataFunctions'
import axios from 'axios';
import api from './Components/api';

function App() {

  const [users, setUsers] = useState([]); 
  const [cols, setCols] = useState([{'Header':'id', 'Accesor' : 'id'},{'Header':'Name', 'Accesor' : 'name'}, {'Header':'Username', 'Accesor' : 'username'}, {'Header':'Email', 'Accesor' : 'email'}]);
  const [objectKeys, setObjectKeys] = useState(['id','name','username','email']);
  const [usersCopy, setUsersCopy] = useState([]); 

  useEffect(() => {
    //  setUsers(loadUsers());
    // console.log(loadUsers());
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
    let tempArrayUser = [];
    users.filter((user, i) => {
      return (user.name.includes(filter.toUpperCase())) ? tempArrayUser.push(user) : false;
      // return objectKeys.forEach((index) => {
      //   // (user[index].includes(filter.toUpperCase())) ? tempArrayUser.push(user) : false;
      //   let string = user[index];

  
      //   if (string.includes(filter.toUpperCase())) {
      //       tempArrayUser.push(user);
      //   } 
      // })
    })
    setUsersCopy(tempArrayUser);
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
