import { useEffect } from 'react'
import './App.css'
import { pingApi } from './apis/ping.js'

function App() {
  useEffect(() => {
    pingApi()
  }, [])
  return (
    <>
      Hello Frontend
    </>
  )
}

export default App
