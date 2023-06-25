import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({Component}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/checkSession', {credentials: "include",});
            setIsLoading(false);
            if (response.status === 200) {
                setIsAuthenticated(true);
            } else if (response.status === 401) {
                setIsAuthenticated(false);
            } else {
                throw new Error('Failed to fetch session');
            }
            } catch (error) {
              console.error(error);
            }
        };
    
        fetchSession();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Component /> : <Navigate to="/" />
}

export default PrivateRoute;