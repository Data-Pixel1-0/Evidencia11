import './App.css'
import LoginForm from './components/LoginForm'
import RobotControl from './components/RobotControl'

function App() {
  return (
    <div className="main-container">
      <h1>Data Pixel</h1>

      <div className="card-professional">
        <LoginForm />
      </div>

      <div className="card-professional">
        <RobotControl nombreRobot="Pixel-Bot 01" id="RX-2026" />
      </div>
    </div>
  )
}

export default App
