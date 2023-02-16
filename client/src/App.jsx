import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [userList, setUserList] = useState(null);
  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4002/register",
    }).then((res) => console.log(res));
  };
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4002/login",
    }).then((res) => console.log(res));
  };
  const getLoginUser = () => {
    Axios({
      method: "GET",
      url: "http://localhost:4002/getLoginUser",
    }).then((res) => {
      if(res.data.username)
        setData(res.data)
      else
        setData(null); 
      console.log(res.data);
    });
  }
  const getAllUsers = () => {
    Axios({
      method: "GET",
      url: "/getUsers",
    }).then((res) => {
      console.log(res.data);
      setUserList(res.data);
    });
  }
  const logout = () => {
    Axios({
      method: "GET",
      url: "http://localhost:4002/logout",
    }).then((res) => {
      console.log(res.data);
      setMessage(res.data);
    });
  }

  return (
    <div className="App">
      <div>
        <h1>Register:</h1>
        (Create/Add user)
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Add User</button>
      </div>

      <div>
        <h1>Login:</h1>
        (Authenticate)
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
        {message ? <h1>{message}</h1> : null}
      </div>
      <div>
        <h1>Get Login User</h1>
        <button onClick={getLoginUser}>Show User</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>
      <div>
        <h1>Get All User</h1>
        (the list should only be availabled after successfully authenticated)
        <button onClick={getAllUsers}>Get Users</button>
        {userList ? <h2>User List <ul>{userList.map((item)=><li key={item._id}>{item.username}</li>)}</ul></h2> : null}
      </div>
    </div>
  );
}

export default App;







// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App
