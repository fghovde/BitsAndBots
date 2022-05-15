/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Layout from '../components/layout/Layout';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Cart() {
  const [items, setItems] = useLocalStorage('cart', []);
  const itemsInCart = items.length > 0;
  const router = useRouter();

  const handleClick = ind => event => {
    const list = [...items];
    const index = list.indexOf(ind);
    list.splice(index, 1);
    setItems([...list]);
  }

  const handleCheckOut = e => {
    router.push('/checkout');
  }

  useEffect(() => {
    handleCheckOut
  });


  return (
    <>
    <Layout>
      <Head>
        <title>Cart | Bits&Bots</title>
        <meta name='description' content='Find your next game today!' />
        <meta name='keywords' content='game, games, video, shop, store, buy, pc, xbox, nintendo, switch, ps, playstation, microsoft' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full max-w-screen-sm mx-auto'>
        <h2 className='py-4 text-xl font-bold'>
          Cart
        </h2>
        <div className='grid gap-y-2'>
        {itemsInCart ? (
        <>
          {items.map(item => (
          <div className='grid grid-cols-8 bg-skin-fill hover:bg-skin-field rounded-lg' key={item.id}>
            <span className='font-heading p-2 col-span-6 sm:col-span-7'>
              {item.Name}
            </span>
            <button className='text-sm p-2 hover:bg-skin-warning rounded-r-lg col-span-2 sm:col-span-1'
              key={item.id}
              onClick={e => handleClick(item)(e)}>
              <img className='inline-flex' src='/gfx/icons/delete.svg' width='24px' height='24px' alt='Delete' />
            </button>
          </div>
          ))}
          <button
            className='text-skin-inverted bg-skin-success hover:bg-skin-warning mt-2 p-3 rounded-3xl w-full font-bold'
            onClick={handleCheckOut}>
            <img
              className='inline-flex mx-2'
              src='/gfx/icons/check_circle-inv.svg'
              width='24px'
              height='24px'
              alt='Add to cart icon' />
          Check out
          </button>
        </>
        ) : (
        <>
          <div className='text-center'>... No items in cart</div>
          <button className='text-skin-inverted bg-skin-success mt-2 p-3 rounded-3xl w-full font-bold disabled:bg-skin-field' disabled>
              Check out
          </button>
        </>
        )
        }
        </div>
      </div>
    </Layout>
    </>
  )
}
