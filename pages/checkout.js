/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Layout from '../components/layout/Layout';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Check from '../components/form/Check';

export default function Checkout() {
  const [items, setItems] = useLocalStorage('cart', []);
  const numberOfItems = items.length;


  return (
    <>
    <Layout>
      <Head>
        <title>Checkout | Bits&Bots</title>
        <meta name='description' content='Find your next game today!' />
        <meta name='keywords' content='game, games, video, shop, store, buy, pc, xbox, nintendo, switch, ps, playstation, microsoft' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-screen-sm mx-auto'>
        <h2 className='py-4 text-xl font-bold'>
          Checkout
        </h2>
        <p>Games in the cart: <span className='font-bold font-heading'>{numberOfItems}</span></p><br />
        <Check />
      </div>
    </Layout>
    </>
  )
}
