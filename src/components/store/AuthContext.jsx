import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    login: false,
    language: 'es-ES',
    idToken: '',
    localId: '',
    nombre: '',
    setAuthData: () => {}
});

export function AuthProvider(props) {
    const [login, setLogin] = useState(false);
    const [idToken, setIdToken] = useState('');
    const [localId, setLocalId] = useState('');
    const [nombre, setNombre] = useState('');

    // Inicializa el estado de auth desde localStorage al cargar la app
    useEffect(() => {
        const storedLogin = localStorage.getItem('login') === 'true';
        const storedToken = localStorage.getItem('idToken') || '';
        const storedLocal = localStorage.getItem('local') || '';
        const storedNombre = localStorage.getItem('nombre') || '';

        if (storedLogin && storedToken) {
            setLogin(true);
            setIdToken(storedToken);
            setLocalId(storedLocal);
            setNombre(storedNombre);
        }
    }, []);

    const setAuthData = (loginValue, token, localValue = '', nombre = '') => {
        setLogin(loginValue);
        setIdToken(token || '');
        setLocalId(localValue);
        setNombre(nombre);

        // Mantener localStorage sincronizado (opcional si ya lo gestiona el login/registro)
        if (loginValue) {
            localStorage.setItem('login', 'true');
            if (token) localStorage.setItem('idToken', token);
            if (localValue) localStorage.setItem('local', localValue);
            if (nombre) localStorage.setItem('nombre', nombre);
        } else {
            localStorage.removeItem('login');
            localStorage.removeItem('idToken');
            localStorage.removeItem('local');
            localStorage.removeItem('nombre');
        }
    };

    return (
        <AuthContext.Provider value={{
            login: login,
            idToken: idToken,
            localId: localId,
            nombre: nombre,
            setAuthData: setAuthData
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;