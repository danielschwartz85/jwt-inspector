import { useState } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setButtonLabel] = useState('x')

  return (
    <>
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setButtonLabel((label) => `${label}x`)}>
          {count}
        </button>
      </div>
    </>
  )
}

export default App
