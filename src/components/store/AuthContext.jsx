import React, { useState } from "react";

const AuthContext = React.createContext({
    login: false,
    idToken: '',
    setAuthData: () => {}
});

export function AuthProvider(props) {

    const [login, setLogin] = useState(false);
    const [idToken, setIdToken] = useState('');

    const setAuthData = (loginValue, token) => {
        setLogin(loginValue);
        setIdToken(token);
    };

    return (
        <AuthContext.Provider value={{
            login: login,
            idToken: idToken,
            setAuthData: setAuthData
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;