import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import "./App.css";

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Contact = () => <h1>Contact</h1>;
const NotFound = () => <h1>404 Not Found</h1>;

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    fetch('http://localhost:3440/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      localStorage.setItem('token', data.token);
    })
    .catch(err => console.log(err));
  };

  const handleProtectedClick = () => {
    fetch('http://localhost:3440/protected', {
      headers: { 'Authorization': localStorage.getItem('token'), "my-custom-header-key": "my-custom-header-value" }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  };

  function handleStorageChange(event) {
    if (event.key === 'token') {
      // Do something when the specific key in local storage changes
      console.log('Local storage value changed:', event.newValue);
    }
  }

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
          <Route path={`${process.env.PUBLIC_URL}/about`} element={<About />} />
          <Route path={`${process.env.PUBLIC_URL}/contact`} element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleClick} >Login</button>
      </div>
      <div>
        <button onClick={handleProtectedClick} >Protected Route</button>
      </div>
      <ul>
        <li><Link to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
        <li><Link to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
        <li><Link to={`${process.env.PUBLIC_URL}/contact`}>Contact</Link></li>
        <li><a href={`${process.env.PUBLIC_URL}/`} >Home ahref</a></li>
        <li><a href={`${process.env.PUBLIC_URL}/about`} >About ahref</a></li>
        <li><a href={`${process.env.PUBLIC_URL}/contact`} >Contact ahref</a></li>
      </ul>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} className="App-logo" alt="logo" />
        </header>
      </div>
    </Router>
  );
}

export default App;
