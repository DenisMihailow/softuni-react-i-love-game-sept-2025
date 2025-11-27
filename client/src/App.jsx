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
import UserContext from "./contexts/UserContext"

function App() {
  const [user, setUser] = useState(null);

  const registerHandler = async (email, password) => {
    
    const newUser = {email,password};

    //TODO REgister API call
    const response = await fetch('http://localhost:3030/users/register',{
      method:'POST',
      headers:{
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const result = await response.json();
    //Login user after register
    setUser(result);
  };

  const loginHandler = (email, password) => {
    
  }

  const logoutHandler = () => {
  }

  const userContextValue = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,

  }

  return (
    <UserContext.Provider value={userContextValue}>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Catalog />} />
        <Route path="/games/:gameId/details" element={<Details  user={user}/>} />
        <Route path="/games/:gameId/edit" element={<Edit />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
      </Routes>

      {/* <Home /> */}

      <Footer />
    </UserContext.Provider>
  )
}

export default App
