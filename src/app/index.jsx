import {Routes, Route} from 'react-router-dom';
import Auth from "./auth";
import Chat from "./chat";
import Protected from "../components/protected";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/chat' element={<Protected redirect='/'><Chat/></Protected>}/>
    </Routes>
  )
}

export default App;
