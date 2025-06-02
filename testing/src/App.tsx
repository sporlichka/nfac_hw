
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Props from './page/Props'
function App() {
 
  return (
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Props" element={<Props/>}></Route>
        </Routes>
  )
}

export default App
