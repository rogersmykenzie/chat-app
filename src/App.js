import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";

function App(props) {
  console.log(props.match.params.roomName);
  const [messages, setMessages] = React.useState([]);
  const [userMessage, setUserMessage] = React.useState("");
  const [socket, setSocket] = React.useState(null);
  React.useEffect(() => {
    console.log("mounted");
    setSocket(io("http://localhost"))
  }, [])

  if(socket) {
    socket.on("newMessage", data => console.log("new messages") || setMessages(data.messages))
  }

  return (
    <div className="App">
      <ul>
        {messages.map(val => <li>{val}</li>)}
      </ul>
      <input
      onChange={e => setUserMessage(e.target.value)} />
      <button
      onClick={() => {
        socket.emit("messageSend", {
          username: "test",
          message: userMessage,
          roomName: props.match.params.roomName
        })
      }}>
        Send Message
      </button>
    </div>
  );
}

export default App;
