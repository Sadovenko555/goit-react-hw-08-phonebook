import css from 'pages/Home/Home.module.css';
import { ReactComponent as PhoneImage } from 'components/img/63988e418447c8fc30e2767e_person_pin_black_24dp 1.svg';
import Login from 'pages/LoginPage/LoginPage';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/auth-slice';

const Home = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  return (
    <div className={css.container}>
      <h1 className={css.title}>
        
        
        <span className={css['title-span']}>
          PHONE_BOOK <PhoneImage></PhoneImage>
        </span>
      </h1>
      {!isLogged && <Login></Login>}
    </div>
  );
};
export default Home;