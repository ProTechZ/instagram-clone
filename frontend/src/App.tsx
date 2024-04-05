import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import NoPageHere from './pages/NoPageHere';
import UserProfile from './pages/UserProfile';

export const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

const App = () => {
  const isLoggedIn = !!document.cookie;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <LogIn />} />
        <Route path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />
        <Route path="/login" element={isLoggedIn ? <Home /> : <LogIn />} />
        <Route
          path="/user/:userId"
          element={isLoggedIn ? <UserProfile /> : <LogIn />}
        />
        <Route path="*" element={isLoggedIn ? <NoPageHere /> : <LogIn />} />
      </Routes>
    </Router>
  );
};

export default App;
