import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { root } from 'postcss'
import p1 from "./assets/p1.png";
import LoginPage from './section/Form/form1'

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowLogin(false)}>Close</button>

      {showLogin && <LoginPage />}
    </div>
  );
}

export default App;
