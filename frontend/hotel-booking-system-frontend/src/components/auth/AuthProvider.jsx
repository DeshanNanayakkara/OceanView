import React, {createContext, useState} from 'react';
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = (token) => {
        const decodedUser = jwtDecode(token);
        localStorage.setItem("userId", decodedUser.sub);

        // 💡 Store roles as JSON string (so we can parse it later safely)
        localStorage.setItem("userRole", JSON.stringify(decodedUser.roles));
        localStorage.setItem("token", token);

        setUser(decodedUser);
    };


    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <div>
            <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
