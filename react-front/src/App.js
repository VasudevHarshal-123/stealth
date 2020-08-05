import React from 'react';
import ReceiveData from './components/ReceiveData';
import SendData from './components/SendData';
import './App.css';

function App() {
  return (
    <div className="App">
        <SendData/>
        <ReceiveData/>
    </div>
  );
}

export default App;
