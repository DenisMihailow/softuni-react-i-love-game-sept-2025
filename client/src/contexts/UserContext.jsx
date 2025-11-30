import { createContext, useState } from "react";
import useRequest from "../hooks/useRequest";

const UserContext = createContext({
    isAuthenticated:false,
    
    user:{
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: ''
    },
    registerHandler() {},
    loginHandler() {},
    logoutHandler() {},
});

export function UserProvider({
  children,  
}){
    const [user, setUser] = useState(null);
  const { request } =useRequest();

  const registerHandler = async (email, password) => {
    
    const newUser = {email,password};

    //TODO REgister API call
    const result = await request('/users/register', 'POST',newUser);

    //Login user after register
    console.log(result)
    setUser(result);
  };

  const loginHandler = async (email, password) => {
    const result = await request('/users/login','POST',{email, password});
    console.log(result);

    setUser(result);
    console.log(setUser(result))
  }

  const logoutHandler = () => {
        if (!user || !user.accessToken) {
        console.warn("User is not logged in — skipping logout request.");
        setUser(null);
        return Promise.resolve();
    }

    // Ако user съществува → изпълняваме logout заявката
    return request('/users/logout', 'GET', null, {
        accessToken: user.accessToken
    })
    .finally(() => {
        // След logout изчистваме user
        setUser(null);
    });
    };

  const userContextValue = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,

  }
    return(
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;