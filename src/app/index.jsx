import {Routes, Route} from 'react-router-dom';
import Auth from "./auth";
import Chat from "./chat";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
  )
}

export default App
