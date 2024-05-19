import { useEffect, useState } from 'react';
import './App.css';

const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketInstance = new WebSocket('ws://localhost:8080');
    socketInstance.onopen = () => {
      console.log('Connected');
      setSocket(socketInstance);
    };

    return () => {
      socketInstance.close();
    };
  }, []);

  return socket;
};

function App() {
  const socket = useSocket();
  const [latestMessage, setLatestMessage] = useState('');

  useEffect(() => {
    if (socket) {
      socket.onmessage = (message: any) => {
        console.log('Received message' + message.data);
        setLatestMessage(message.data);
      };
    }
  }, [socket]);

  if (!socket) {
    return <div>Connecting to socker server ...</div>;
  }

  return (
    <>
      <input type="text" onBlur={(e) => socket.send(e.target.value)} />
      {latestMessage}
    </>
  );
}

export default App;
