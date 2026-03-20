import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    login: false,
    idToken: '',
    localId: '',
    setAuthData: () => {}
});

export function AuthProvider(props) {
    const [login, setLogin] = useState(false);
    const [idToken, setIdToken] = useState('');
    const [localId, setLocalId] = useState('');

    // Inicializa el estado de auth desde localStorage al cargar la app
    useEffect(() => {
        const storedLogin = localStorage.getItem('login') === 'true';
        const storedToken = localStorage.getItem('idToken') || '';
        const storedLocal = localStorage.getItem('local') || '';

        if (storedLogin && storedToken) {
            setLogin(true);
            setIdToken(storedToken);
            setLocalId(storedLocal);
        }
    }, []);

    const setAuthData = (loginValue, token, localValue = '') => {
        setLogin(loginValue);
        setIdToken(token || '');
        setLocalId(localValue);

        // Mantener localStorage sincronizado (opcional si ya lo gestiona el login/registro)
        if (loginValue) {
            localStorage.setItem('login', 'true');
            if (token) localStorage.setItem('idToken', token);
            if (localValue) localStorage.setItem('local', localValue);
        } else {
            localStorage.removeItem('login');
            localStorage.removeItem('idToken');
            localStorage.removeItem('local');
        }
    };

    return (
        <AuthContext.Provider value={{
            login: login,
            idToken: idToken,
            localId: localId,
            setAuthData: setAuthData
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;