import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
const socket = io("http://localhost");

function App() {
  const [messages, setMessages] = React.useState([]);
  const [userMessage, setUserMessage] = React.useState("");

  socket.on("newMessage", data => console.log("new messages") || setMessages(data.messages))

  return (
    <div className="App">
      <ul>
        {messages.map(val => <li>{val}</li>)}
      </ul>
      <input
      onChange={e => setUserMessage(e.target.value)} />
      <button
      onClick={() => {
        socket.emit("messageSend", {message: userMessage})
      }}>
        Send Message
      </button>
    </div>
  );
}

export default App;
