import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Header, HeaderContent, Profile } from './styles';

const useStyles = makeStyles({
  containerHeader: {
    display: 'flex',
  },
});

const MyHeader: React.FC = () => {
  const classes = useStyles();
  const { user, signOut } = useAuth();

  return (
    <Header>
      <HeaderContent>
        <Container className={classes.containerHeader} maxWidth="lg">
          <Profile>
            <div>
              <span id="bemVindo">Bem-vindo,</span>
              {/* <Link to="/profile"> */}
              <strong>{user.name}</strong>
              {/* </Link> */}
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </Container>
      </HeaderContent>
    </Header>
  );
};

export default MyHeader;
