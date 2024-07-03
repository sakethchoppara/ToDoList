import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup'
import Todolist from './Components/TodoList/Todolist';
import Welcome from './Components/Welcome/Welcome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/app' element={<Welcome/>} />
        <Route path='/app/login' element={<Login/>} />
        <Route path='/app/signup' element={<SignUp/>} />
        <Route path='/app/todolist/' element={<Todolist/>} />
      </Routes>
    </div>
  );
}

export default App;
