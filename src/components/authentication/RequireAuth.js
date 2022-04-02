    import { useLocation, Navigate, Outlet } from 'react-router-dom';
    import useAuth from '../hooks/useAuth';

    const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth, 'auth object');
    return auth?.email ? (
        <Outlet />
    ) : (
        //only if there is a user /email  will it show the outlet components
        <Navigate to="/signin" state={{ from: location }} replace />
    );
    //otherwise Navigate to signin from the location they came from
    //replace login in the navigation history
    };

    export default RequireAuth;
