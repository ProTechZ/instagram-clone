import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import NoPageHere from './pages/NoPageHere';
import UserProfile from './pages/UserProfile';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('userId');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="*" element={<NoPageHere />} />
      </Routes>
    </Router>
  );
};

export default App;

