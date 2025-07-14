// src/routes/PremiumRoute.jsx
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';

const PremiumRoute = ({ children }) => {
    const { user, isPremium, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading />;
    if (user && isPremium) return children;
    return <Navigate to="/subscription" state={{ from: location }} replace />;

};

export default PremiumRoute;
