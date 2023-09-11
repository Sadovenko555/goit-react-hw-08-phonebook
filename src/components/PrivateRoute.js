import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/auth-slice';

const PrivateRoute = ({ children, path = '/login' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return <>{isLoggedIn ? children : <Navigate to={path} />}</>;
};
export default PrivateRoute;
