import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/gaditek-logo-disrupt.svg";
import { loginInitiate, setErrorEmpty } from "../../../redux/actions";
import { Form, Header, Main, MainHeading, WarningText } from "./styledComponent";

const inputStyle = {
  width: "100%",
  marginBottom: "2rem",
};
const passwordErrorMessages = {
  minimumCharacterWarning: "Password should not be less than 8 characters",
  passwordValidation:
    "Password must contain at least one lower case, one upper case, one number and a special character",
};

const { minimumCharacterWarning, passwordValidation } = passwordErrorMessages;

const Login = () => {
  const {user, error} = useSelector(state =>  state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);

  // validate password
  const validatePassword = () => {
    const regexRes = password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!><@#$%?,;.^/&}{*)(_+:[}="|`'-])[\\.~!><@,;#$%?^}{/&*)(+:[}=|"`'\w-\]]{6,19}$/
    );

    if (regexRes == null) {
      setPasswordError(passwordValidation);
      return false;
    }

    if (password.length < 8) {
      setPasswordError(minimumCharacterWarning);
      return false;
    }
    if (regexRes == null) {
      setPasswordError(passwordValidation);
      return false;
    }

    return true;
  };

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  }, [navigate, user])

  // reset error message
  useEffect(() => {
    setPasswordError('')
  }, [password])

  useEffect(() => {
    dispatch(setErrorEmpty())
  }, [dispatch, email, password])

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginSumbitHandler = (e) => {
    e.preventDefault();

    try {
      setDisabledBtn(true);

      if (!validatePassword()) {
        setDisabledBtn(false);
        return;
      }

      if (error) {
        setDisabledBtn(false);
        return;
      }

      if (validatePassword() && !error) {
        const data = {
          email: email,
          password: password,
        };

        console.log('cccc', error)

        dispatch(loginInitiate(email, password));
        console.log(data);

        setEmail("");
        setPassword("");
        setDisabledBtn(false);
      }
    } catch (error) {
      console.log(error);
      setDisabledBtn(false);
    }
  };
  return (
    <Main>
      <div className='logo'>
        <img src={logo} alt='' />
      </div>

      <Form onSubmit={loginSumbitHandler}>
        <Header>
          <MainHeading>Login to Gaditek</MainHeading>
        </Header>

        {error && (
            <Alert
              severity="error"
              sx={{
                fontSize: '1.4rem',
                padding: '0.5rem 1rem',
                width: '100%',
                marginBottom: '1.5rem',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}
              className="error-mesg"
            >
              <span>{error}</span>
            </Alert>
          )}

        <div className='form-control'>
          <InputLabel htmlFor='email'>Email</InputLabel>

          <OutlinedInput
            id='email'
            label=''
            type='text'
            value={email}
            onChange={emailChangeHandler}
            required
            style={{
              width: "100%",
              marginBottom: "2rem",
              height: "3rem",
            }}
          />
        </div>
        <div className='form-control'>
          <InputLabel htmlFor='password'>Password</InputLabel>

          <OutlinedInput
            id='password'
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={passwordChangeHandler}
            required
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label=''
            style={{
              width: "100%",
              marginBottom: "0.5rem",
              height: "3rem",
            }}
          />
          {passwordError === minimumCharacterWarning && (
              <WarningText mb="10px">
                {minimumCharacterWarning}
              </WarningText>
            )}
            {passwordError === passwordValidation && (
              <WarningText mb="10px">
                {passwordValidation}
              </WarningText>
            )}
        </div>
        <Button
          variant='contained'
          endIcon={<ArrowForwardIcon />}
          style={{ width: "100%", marginTop: '1.5rem' }}
          type='submit'
          disabled={disabledBtn}
        >
          Login
        </Button>
      </Form>
    </Main>
  );
};

export default Login;
