import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useForm } from "react-hook-form";

const Register = () => {
    const [name, setName] = useLocalStorage('registerName', '');
    const [username, setUsername] = useLocalStorage('registerUsername', '');
    const [password, setPassword] = useLocalStorage('registerPassword', '');
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const onSubmit = async data => {
      setName(data.name);
      setUsername(data.username);
      setPassword(data.password);
    };

    return (
    <>
    {isSubmitSuccessful ? (
      <>
    <p className='forms__text forms__text--success'>
      <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
        <path d="M0,0H24V24H0Z" fill="none"/>
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM10,17,5,12l1.41-1.41L10,14.17l7.59-7.59L19,8Z" fill="#15DDCF"/>
      </svg>
      Welcome {name}!<br />
      Your user is registered.<br />
    </p>
    </>
      ) : (
    <form className='forms' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name' className='forms__label'>
          Full name
        </label>
        <input
        className='forms__input'
        id='name'
        type='text'
        placeholder='Full name'
        aria-label='Full name'
        {...register('name', {
          required: {
            value: true,
            message: 'Required: Enter your full name.'
          },
          pattern: {
            value: /^(\w\w+)\s(\w+)$/,
            message: 'Fill in your first and last name.'
          },
        })}
        />
        {errors.name && <p className='forms__text forms__text--error'>{errors.name.message}</p>}
        <label htmlFor='username' className='forms__label'>
          Email (username)
        </label>
        <input
        className='forms__input'
        id='username'
        type='email'
        placeholder='Email'
        aria-label='Email'
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
        <input type='submit' value='Register' className='forms__submit forms__submit--primary'></input>
        </form>
      )
      }
    </>
  );
};

export default Register;