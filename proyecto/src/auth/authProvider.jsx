import { useEffect , useState} from "react";
import { AuthContext } from "./authContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [username, setUsername] = useState(localStorage.getItem('username') || null);

    function logout() {
        setToken(null);
        setUserId(null);
        setUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }

    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
    }, [token, userId, username]);

    return (
        <AuthContext.Provider value={{ token, setToken, userId, setUserId, username, setUsername, logout}}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;