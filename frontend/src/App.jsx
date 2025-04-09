import './App.css';
import { Router } from './Router.jsx';

function App() {
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
