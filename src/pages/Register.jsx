import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
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
  margin: 20% auto auto auto;
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

const Register = () => {
  const auth = getAuth();
  const [registerDetails, setRegisterDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [registerDetailsError, setRegisterDetailsError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobile: false,
    password: false,
    confirmPassword: false,
  });
  const [firebaseError, setFirebaseError] = useState('');

  const handleInput = (e, type) => {
    switch (type) {
      case 'firstName':
        setRegisterDetails((prev) => ({ ...prev, firstName: e.target.value }));
        break;
      case 'lastName':
        setRegisterDetails((prev) => ({ ...prev, lastName: e.target.value }));
        break;
      case 'email':
        setRegisterDetails((prev) => ({ ...prev, email: e.target.value }));
        break;
      case 'mobile':
        setRegisterDetails((prev) => ({ ...prev, mobile: e.target.value }));
        break;
      case 'password':
        setRegisterDetails((prev) => ({ ...prev, password: e.target.value }));
        break;
      case 'confirmPassword':
        setRegisterDetails((prev) => ({
          ...prev,
          confirmPassword: e.target.value,
        }));
        break;

      default:
        break;
    }
  };

  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}/;

  const passwordRegex =
    // eslint-disable-next-line
    /[a-zA-Z0-9-._!"\`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]{3,}$/;

  const mobileRegex = /[0-9]{11}$/;

  const nameRegex = /[a-zA-z-]{2,}/;

  console.log(mobileRegex.test('07869377998'));

  const validateRegisterDetails = async () => {
    const firstName = nameRegex.test(registerDetails.firstName);
    if (!firstName) {
      setRegisterDetailsError((prev) => ({
        ...prev,
        firstName: 'Invalid First Name',
      }));
    } else {
      setRegisterDetailsError((prev) => ({
        ...prev,
        firstName: '',
      }));
    }
    const lastName = nameRegex.test(registerDetails.lastName);
    if (!lastName) {
      setRegisterDetailsError((prev) => ({
        ...prev,
        lastName: 'Invalid Last Name',
      }));
    } else {
      setRegisterDetailsError((prev) => ({
        ...prev,
        lastName: '',
      }));
    }
    const email = emailRegex.test(registerDetails.email);
    if (!email) {
      setRegisterDetailsError((prev) => ({
        ...prev,
        email: 'Invalid Email Address',
      }));
    } else {
      setRegisterDetailsError((prev) => ({
        ...prev,
        email: '',
      }));
    }
    const mobile = mobileRegex.test(registerDetails.mobile);
    if (!mobile) {
      setRegisterDetailsError((prev) => ({
        ...prev,
        mobile: 'Invalid Mobile Number',
      }));
    } else {
      setRegisterDetailsError((prev) => ({
        ...prev,
        mobile: '',
      }));
    }
    const password = passwordRegex.test(registerDetails.password);
    if (!password) {
      setRegisterDetailsError((prev) => ({
        ...prev,
        password: 'Invalid Password',
      }));
    } else {
      setRegisterDetailsError((prev) => ({
        ...prev,
        password: '',
      }));
    }
    const confirmPassword =
      registerDetails.password === registerDetails.confirmPassword;

    if (!confirmPassword) {
      setRegisterDetailsError((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
    } else {
      setRegisterDetailsError((prev) => ({
        ...prev,
        confirmPassword: '',
      }));
    }
    if (
      firstName &&
      lastName &&
      mobile &&
      email &&
      password &&
      confirmPassword
    ) {
      return true;
    }
    return false;
  };

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const navigate = useNavigate();

  const addUser = async (uid) => {
    const userDetails = {
      firstName: registerDetails.firstName,
      lastName: registerDetails.lastName,
      email: registerDetails.email,
      mobile: registerDetails.mobile,
    };
    try {
      const response = await fetch('/.netlify/functions/registerUser', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, userDetails }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handleSubmit = async () => {
    const validation = await validateRegisterDetails();
    if (validation) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          registerDetails.email,
          registerDetails.password
        );
        const { uid } = userCredential.user;
        console.log(uid);
        const response = await addUser(uid);
        console.log(response);
        navigate(from, { replace: true });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
          setFirebaseError('Email already in use');
        } else {
          setFirebaseError('Error');
        }
      }
    }
  };

  return (
    <Container style={{ height: '100vh' }} maxWidth="sm">
      <StyledCard>
        <StyledTitleText>Register</StyledTitleText>
        <StyledInputField
          size="small"
          error={registerDetailsError.firstName}
          id="firstName"
          label="First Name"
          /* defaultValue="Hello World" */
          helperText={
            registerDetailsError.firstName
              ? registerDetailsError.firstName
              : ' '
          }
          onChange={(e) => handleInput(e, 'firstName')}
        />
        <StyledInputField
          size="small"
          error={registerDetailsError.lastName}
          id="lastName"
          label="Last Name"
          /* defaultValue="Hello World" */
          helperText={
            registerDetailsError.lastName ? registerDetailsError.lastName : ' '
          }
          onChange={(e) => handleInput(e, 'lastName')}
        />
        <StyledInputField
          size="small"
          error={registerDetailsError.email}
          id="email"
          label="Email"
          /* defaultValue="Hello World" */
          helperText={
            registerDetailsError.email ? registerDetailsError.email : ' '
          }
          onChange={(e) => handleInput(e, 'email')}
        />
        <StyledInputField
          size="small"
          error={registerDetailsError.mobile}
          id="mobile"
          label="Mobile"
          /* defaultValue="Hello World" */
          helperText={
            registerDetailsError.mobile ? registerDetailsError.mobile : ' '
          }
          onChange={(e) => handleInput(e, 'mobile')}
        />
        <StyledInputField
          size="small"
          error={registerDetailsError.password}
          id="password"
          label="Password"
          /* defaultValue="Hello World" */
          helperText={
            registerDetailsError.password ? registerDetailsError.password : ' '
          }
          onChange={(e) => handleInput(e, 'password')}
        />
        <StyledInputField
          size="small"
          error={registerDetailsError.confirmPassword}
          id="confirmPassword"
          label="Confirm Password"
          /* defaultValue="Hello World" */
          helperText={
            registerDetailsError.confirmPassword
              ? registerDetailsError.confirmPassword
              : ' '
          }
          onChange={(e) => handleInput(e, 'confirmPassword')}
        />
        <StyledErrorText>{firebaseError}</StyledErrorText>
        <StyledButton
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Register
        </StyledButton>
        <StyledRegisterText>
          <Link to="/signin">Already have an account?</Link>
        </StyledRegisterText>
      </StyledCard>
    </Container>
  );
};

export default Register;
