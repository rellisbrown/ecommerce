import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import { AuthProvider } from './utils/useAuth';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
