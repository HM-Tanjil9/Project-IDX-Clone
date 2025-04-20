// import { io } from 'socket.io-client';
import './App.css';
import { Router } from './Router.jsx';
function App() {
  // const socket = io(import.meta.env.VITE_BACKEND_URL);
  // const [isVisible, setIsVisible] = useState(false);
  return(
    <>
      {/* <button onClick={() => {setIsVisible(!isVisible)}}>Toggle test ping</button>
      {isVisible && <PingComponents/>} */}

      <Router/>
    </>
  )
}

export default App
