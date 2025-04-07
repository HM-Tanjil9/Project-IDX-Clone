import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { PingComponents } from './components/atoms/PingComponents.jsx';
import { CreateProject } from './pages/CreateProject.jsx';

function App() {
  // const [isVisible, setIsVisible] = useState(false);
  return(
    <>
      {/* <button onClick={() => {setIsVisible(!isVisible)}}>Toggle test ping</button>
      {isVisible && <PingComponents/>} */}

      <Routes>
        <Route path='/' element={<CreateProject/>}/>
      </Routes>
    </>
  )
}

export default App
