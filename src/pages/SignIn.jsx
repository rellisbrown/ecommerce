import React, { useState } from 'react';
import styled from '@emotion/styled';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const StyledCard = styled(Card)`
  width: 60%;
  min-width: 300px;
  margin: 40% auto auto auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledTitleText = styled.h3`
  display: flex;
  margin: auto auto 1rem auto;
`;

const StyledInputField = styled(TextField)`
  margin: 0.5rem 1rem 0 1rem;
`;

const StyledButton = styled(Button)`
  width: fit-content;
  margin: 1rem auto 1rem auto;
`;

const StyledRegisterText = styled.p`
  margin: auto auto 0 auto;
`;

const StyledErrorText = styled.p`
  margin: auto;
  color: red;
  font-size: 1rem;
`;

const SignIn = () => {
  const auth = getAuth();
  const [signInDetails, setSignInDetails] = useState({
    email: '',
    password: '',
  });
  const [signInDetailsError, setSignInDetailsError] = useState({
    email: '',
    password: '',
  });

  const [firebaseError, setFirebaseError] = useState('');

  const handleInput = (e, type) => {
    switch (type) {
      case 'email':
        setSignInDetails((prev) => ({ ...prev, email: e.target.value }));
        break;
      case 'password':
        setSignInDetails((prev) => ({ ...prev, password: e.target.value }));
        break;

      default:
        break;
    }
  };

  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}/;

  const passwordRegex =
    // eslint-disable-next-line
    /[a-zA-Z0-9-._!"\`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]{3,}$/;

  const validateSignInDetails = async () => {
    const email = emailRegex.test(signInDetails.email);
    if (!email) {
      setSignInDetailsError((prev) => ({
        ...prev,
        email: 'Invalid Email Address',
      }));
    } else {
      setSignInDetailsError((prev) => ({
        ...prev,
        email: '',
      }));
    }
    const password = passwordRegex.test(signInDetails.password);
    if (!password) {
      setSignInDetailsError((prev) => ({
        ...prev,
        password: 'Invalid Password',
      }));
    } else {
      setSignInDetailsError((prev) => ({
        ...prev,
        password: '',
      }));
    }
    if (email && password) {
      return true;
    }
    return false;
  };

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const validation = await validateSignInDetails();
    if (validation) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          signInDetails.email,
          signInDetails.password
        );

        navigate(from, { replace: true });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setFirebaseError('Incorrect email / password');
      }
    }
  };

  return (
    <Container style={{ height: '100vh' }} maxWidth="sm">
      <StyledCard>
        <StyledTitleText>Sign In</StyledTitleText>
        <StyledInputField
          size="small"
          error={signInDetailsError.email}
          id="email"
          label="Email"
          /* defaultValue="Hello World" */
          helperText={signInDetailsError.email ? signInDetailsError.email : ' '}
          onChange={(e) => handleInput(e, 'email')}
        />
        <StyledInputField
          size="small"
          error={signInDetailsError.password}
          id="password"
          label="Password"
          /* defaultValue="Hello World" */
          helperText={
            signInDetailsError.password ? signInDetailsError.password : ' '
          }
          onChange={(e) => handleInput(e, 'password')}
        />
        <StyledErrorText>{firebaseError}</StyledErrorText>
        <StyledButton
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Sign In
        </StyledButton>
        <StyledRegisterText>
          <Link to="/register">Dont have an account?</Link>
        </StyledRegisterText>
      </StyledCard>
    </Container>
  );
};

export default SignIn;
