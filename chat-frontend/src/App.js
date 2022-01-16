import './App.scss';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/chat/chat';
import ProtectedRoute from './components/router/protectedRoute';

function App() {
  return (
    
      <Router>
        <div className="App">
        <Routes>
          <Route exact path='/' element={<ProtectedRoute> <Chat/> </ProtectedRoute>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;
