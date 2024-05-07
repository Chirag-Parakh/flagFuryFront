import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import LeaderBoard from "./components/LeaderBoard"
import Background from "./components/Background"
import Header from "./components/Header"
function App() {

  return (
    <BrowserRouter>
    {/* <Header/> */}
    <Background/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/> }/>
      <Route path="/leaderboard" element={<LeaderBoard/> }/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
