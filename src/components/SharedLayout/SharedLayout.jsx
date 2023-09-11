import { Suspense } from 'react';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/auth-slice';
import { NavLink, Outlet } from 'react-router-dom';
import { UserMenu } from 'components/UserMenu/UserMenu';
import styled from 'styled-components';
import css from 'components/SharedLayout/SharedLayout.module.css';

const StyledLink = styled(NavLink)`
  color: #2ca9bc;
}

  &.active {
    color: #2ca9bc;
  }
`;

export const SharedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <header>
        <nav>
          <StyledLink className={css['navigation-link']} to="/" end>
            Home
          </StyledLink>
          {isLoggedIn && (
            <StyledLink className={css['navigation-link']} to="/contacts">
              Contacts
            </StyledLink>
          )}
        </nav>
        {isLoggedIn ? (
          <UserMenu></UserMenu>
        ) : (
          <div className={css['auth-container']}>
            <StyledLink className={css['navigation-link']} to="/register">
              Register
            </StyledLink>
            <StyledLink className={css['navigation-link']} to="/logIn">
              Login
            </StyledLink>
          </div>
        )}
      </header>
      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
//