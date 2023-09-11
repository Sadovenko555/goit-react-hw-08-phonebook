import { useSelector, useDispatch } from 'react-redux';
import { selectUserName } from 'redux/auth/auth-slice';
import { logOut } from 'redux/auth/auth-operation';
import { ReactComponent as ExitSVG } from '../img/exit.svg';

import css from 'components/UserMenu/UserMenu.module.css';

export const UserMenu = () => {
  const name = useSelector(selectUserName);
  const dispatch = useDispatch();

  return (
    <div className={css['userMenu-container']}>
      <p className={css.username}>{name}</p>
      <button className={css['logout-btn']} onClick={() => dispatch(logOut())}>
        Logout <ExitSVG className={css.icon}></ExitSVG>
      </button>
    </div>
  );
};