import { useEffect, useState } from 'react';

const WebSocketClient = ({ onDataReceived }: any) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:5000/ws');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      onDataReceived('halo', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [onDataReceived]);

  return null;
};

export default WebSocketClient;
