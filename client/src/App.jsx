import { Route, Routes } from "react-router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import Details from "./components/details/Details"
import GameCreate from "./components/game-create/GameCreate"
import Register from "./components/register/Register"
import { useState } from "react"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import Edit from "./components/edit/Edit"

function App() {
  const [registerUsers,setRegisterUsers] = useState([]);
  const [user, setUser] = useState(null);

  const registerHandler = (email, password) => {
    if(registerUsers.some(user => user.email === email)){
      throw new Error('Email is taken!')
    }
    const newUser = {email,password};

    setRegisterUsers(state => [...state, newUser]);

    //Login user after register
    setUser(newUser);
  };

  const loginHandler = (email, password) => {
    const user = registerUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or pasword');
    }
    setUser(user);
  }

  const logoutHandler = () => {
    setUser(null);
  }

  return (
    <>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Catalog />} />
        <Route path="/games/:gameId/details" element={<Details />} />
        <Route path="/games/:gameId/edit" element={<Edit />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="/register" element={<Register onRegister={registerHandler} />} />
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
      </Routes>

      {/* <Home /> */}

      <Footer />
    </>
  )
}

export default App
