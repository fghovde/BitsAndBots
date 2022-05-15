/* eslint-disable @next/next/no-img-element */
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const Check = () => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();
    const [items, setItems] = useLocalStorage('cart', []);
    const router = useRouter();

    const onSubmit = async data => {
      console.log(data);
      console.log(isSubmitSuccessful);
    };

    const handleClick = e => {
      setItems([]);
      router.push('/browse');
    }


    return (
    <>
    {isSubmitSuccessful ? (
      <>
      <div className='grid content-center z-50 absolute left-0 top-0 w-screen h-screen backdrop-blur-sm'>
          <button
            className='text-skin-inverted bg-skin-success mx-auto hover:bg-skin-warning p-3 rounded-3xl w-full max-w-screen-sm font-bold'
            onClick={handleClick}>
            <img
              className='inline-flex mx-2'
              src='/gfx/icons/check_circle-inv.svg'
              width='24px'
              height='24px'
              alt='Add to cart icon' />
            Confirm payment
          </button>
      </div>
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
          Address
        </label>
        <input
        className='forms__input'
        id='address'
        type='text'
        placeholder='Address'
        aria-label='Address'
        {...register('address', {
          required: {
            value: true,
            message: 'Required: Enter your street address.'
          },
        })}
        />
        {errors.address && <p className='forms__text forms__text--error'>{errors.address.message}</p>}
        <label htmlFor='credit' className='forms__label'>
          Credit card number
        </label>
        <input
        className='forms__input'
        id='credit'
        type='number'
        placeholder='Credit card number'
        aria-label='Credit card number'
        {...register('credit', {
          required: {
            value: true,
            message: 'Required: Enter your credit card number.'
          },
          minLength: {
            value: 16,
            message: 'Credit card number must be minimum 16 characters.'
          },
        })}
        />
        {errors.credit && <p className='forms__text forms__text--error'>{errors.credit.message}</p>}
        <label htmlFor='password' className='forms__label'>
          CCV/CVC number
        </label>
        <input
        className='forms__input'
        id='ccv'
        type='number'
        placeholder='CCV/CVC number'
        aria-label='CCV/CVC number'
        {...register('ccv', {
          required: {
            value: true,
            message: 'Required: CCV/CVC number.'
          },
          minLength: {
            value: 3,
            message: 'CCV/CVC number must be 3 characters.'
          },
          maxLength: {
            value: 3,
            message: 'CCV/CVC number must be 3 characters.'
          },
        })}
        />
        {errors.ccv && <p className='forms__text forms__text--error'>{errors.ccv.message}</p>}
        <input type='submit' value='Check out' className='forms__submit forms__submit--primary'></input>
        </form>
      )
      }
    </>
  );
};

export default Check;