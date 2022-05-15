import { useRouter } from 'next/router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useLocalStorage('username', '');
  const [password, setPassword] = useLocalStorage('password', '');
  const [registerUsername, setRegisterUsername] = useLocalStorage('registerUsername', '');
  const [registerPassword, setRegisterPassword] = useLocalStorage('registerPassword', '');
  const [loggedIn, setLoggedIn] = useLocalStorage('loggedin', '');
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

  const onSubmit = async data => {
      setUsername(data.username);
      setPassword(data.password);
      if (username === registerUsername && password === registerPassword || null) {
        setLoggedIn(true);
        router.push('/browse');
      }
      if (password === null) {
        console.log('LOGIN ATTEMPT FAILED');
      }
      else {
        return console.log(isSubmitSuccessful);
      }
  }


  return (
    <>
      {loggedIn ? (
        <>
          <p className='forms__text forms__text--success'>
            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
              <path d="M0,0H24V24H0Z" fill="none"/>
              <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM10,17,5,12l1.41-1.41L10,14.17l7.59-7.59L19,8Z" fill="#15DDCF"/>
            </svg>
            You are signed in as user <br />
            {username}.<br />
          </p>
        </>
      ) : (
      <form onSubmit={handleSubmit(onSubmit)} className='forms'>
            <label htmlFor='username' className='forms__label'>
              Email (username)
            </label>
            <input
            className='forms__input'
            id='username'
            type='email'
            placeholder='Email (username)'
            aria-label='Username'
            {...register('username', {
              required: {
                value: true,
                message: 'Required: Enter your email address.'
              },
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Fill in valid email address.'
              },
            })}
            />
            {errors.username && <p className='forms__text forms__text--error'>{errors.username.message}</p>}
            <label htmlFor='password' className='forms__label'>
              Password
            </label>
            <input
            className='forms__input'
            id='password'
            type='password'
            placeholder='Password'
            aria-label='Password'
            {...register('password', {
              required: {
                value: true,
                message: 'Required: Enter your password.'
              },
              minLength: {
                value: 8,
                message: 'Password must be minimum 8 characters.'
              },
            })}
            />
            {errors.password && <p className='forms__text forms__text--error'>{errors.password.message}</p>}
            <input type='submit' value='Login' className='forms__submit forms__submit--primary'></input>
        </form>
        )
      }
    </>
    );
};

export default Login;