import './App.css'
import Navbar from './components/Navbar/Navbar'
import Front from './components/Front/Front'
import {Route,Routes } from "react-router-dom"
function App() {

  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<section id="squadPage">
          <Front></Front>
           </section>}/>
           <Route path="/teamsheet" element={<section id="squadPage">
          <Front isTeam></Front>
           </section>}/>
    </Routes>
    
    </>
  )
}

export default App
