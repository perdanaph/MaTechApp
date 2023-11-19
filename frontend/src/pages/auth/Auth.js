import { useState } from 'react';
// import background from '../../images/background.jpg';
import logoAuth from '../../images/logo.jpg';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password1: '',
  });
  const [loginForm, setloginForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    if (registerForm.password !== registerForm.password1) {
      setPasswordMatch(false);
    } else {
      const response = await fetch(
        process.env.REACT_APP_API_HOST + '/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      if (json.succcess) {
        setSuccess(true);
        handlePanel();
      }
    }
  };

  const login = async (email, password) => {
    const response = await fetch(process.env.REACT_APP_API_HOST + '/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      navigate('/');
    } else {
      setError(true);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    await register(
      registerForm.name,
      registerForm.email,
      registerForm.password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(loginForm.email, loginForm.password);
  };

  const handlePanel = () => {
    const background = document.querySelector('.container-auth');
    background.classList.toggle('left-overlay-active');
  };

  const handleInputRegister = (event) => {
    setRegisterForm((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleInputLogin = (event) => {
    setloginForm((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className='content-auth'>
      <div className='container-auth'>
        {/* auth */}
        <div className='container-form'>
          <div className='form'>
            <div className='signIn'>
              {/* <div>
                <img src={logo} alt='' width={200} />
              </div> */}

              <h2 className='mt-1'>Login</h2>
              {error === true ? (
                <div className='alert alert-danger'>
                  Email atau password failed!
                </div>
              ) : (
                ''
              )}
              {success === true ? (
                <div className='alert alert-success'>
                  Succesfully registered. Please login first!
                </div>
              ) : (
                ''
              )}
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                  <label>Email</label>
                  <input
                    name='email'
                    type='email'
                    onChange={handleInputLogin}
                    placeholder='Input your email'
                    className='form-control'
                  />
                </div>
                <div className='form-group mb-3'>
                  <label>Password</label>
                  <input
                    name='password'
                    type='password'
                    onChange={handleInputLogin}
                    placeholder='Input your password'
                    className='form-control'
                  />
                </div>
                <button className='btn btn-success mt-3 mb-2 w-100'>
                  Login
                </button>
                <span>
                  Dont have an account?{' '}
                  <span
                    style={{
                      color: 'rgb(13, 110, 253)',
                      cursor: 'pointer',
                    }}
                    onClick={handlePanel}
                  >
                    Register
                  </span>
                </span>
                <br />
                <span>
                  Forgot Password?{' '}
                  <span
                    style={{
                      color: 'rgb(13, 110, 253)',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot
                  </span>
                </span>
              </form>
            </div>
            <div className='signUp'>
              {/* <center>
                <img
                  className='text-center'
                  src={logo}
                  alt='logo'
                  width={200}
                />
              </center> */}

              {passwordMatch === false ? (
                <div className='alert alert-danger'>Password faied!</div>
              ) : (
                ''
              )}
              <h2>Register</h2>
              <form onSubmit={handleSubmitRegister}>
                <div className='form-group mb-3'>
                  <label>Username</label>
                  <input
                    className='form-control'
                    name='name'
                    onChange={handleInputRegister}
                    type='name'
                    placeholder='Input your username'
                  />
                </div>
                <div className='form-group mb-3'>
                  <label>Email</label>
                  <input
                    className='form-control'
                    name='email'
                    onChange={handleInputRegister}
                    type='email'
                    placeholder='Input your email'
                  />
                </div>
                <div className='form-group mb-3'>
                  <label>Password</label>
                  <input
                    className='form-control'
                    name='password'
                    onChange={handleInputRegister}
                    type='password'
                    placeholder='Input your password'
                    min={8}
                  />
                </div>
                <div className='form-group mb-3'>
                  <label>Confirm Password</label>
                  <input
                    className='form-control'
                    name='password1'
                    onChange={handleInputRegister}
                    type='password'
                    placeholder='Confirmation your password'
                    min={8}
                  />
                </div>
                <button className='btn btn-success mt-3 mb-2 d-block w-100'>
                  Register
                </button>
                <span className=''>
                  {' '}
                  Already have an account?{' '}
                  <span
                    style={{
                      color: 'rgb(13, 110, 253)',
                      cursor: 'pointer',
                    }}
                    onClick={handlePanel}
                  >
                    Login
                  </span>
                </span>
              </form>
            </div>
          </div>
        </div>
        {/* overlay */}
        <div className='overlay'>
          <div className='overlay-content'>
            <div className='overlay-left'>
              <center>
                <img src={logoAuth} alt='' />
              </center>
              <p className='text-center'>
              Increase the quality and quantity of discussions with FMIKOM UNUGHA CILACAP: Together we learn, develop, share in the fields of Mathematics and Technology
              </p>
            </div>
            <div className='overlay-right'>
              <center>
                <img src={logoAuth} alt='' />
              </center>
              <p className='text-center'>
              Increase the quality and quantity of discussions with FMIKOM UNUGHA CILACAP: Together we learn, develop, share in the fields of Mathematics and Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
