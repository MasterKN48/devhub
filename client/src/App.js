import React from 'react';
import Navbar from './component/layout/Navbar';
import './App.css';
import Footer from './component/layout/Footer';
function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>My React App</h1>
      <Footer />
    </div>
  );
}

export default App;
