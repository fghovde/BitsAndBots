import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Login from '../components/form/Login';
import Register from '../components/form/Register';
import Logo from '../components/navbar/Logo';
import Navbar from '../components/navbar/Navbar';

export default function Home() {
  const [tabOpen, setTabOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useLocalStorage('loggedin', '');

  return (
    <Layout home>
      <Head>
        <title>Bits&Bots</title>
        <meta name='description' content='Find your next game today!' />
        <meta name='keywords' content='game, games, video, shop, store, buy, pc, xbox, nintendo, switch, ps, playstation, microsoft' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='layout layout--index'>
        {loggedIn ?
        (
        <div className='container mx-auto px-4'>
          <Navbar />
        </div>
        ) : (
        <div className='layout__container'>
          <nav className='navbar'>
            <div className='navbar__container navbar__container--center'>
              <Logo />
            </div>
          </nav>
        </div>
        )}
        <div className='layout__container'>
          <div className='mx-auto max-w-xs mt-6 mb-2 sm:mt-14 sm:mb-10'>
            <h2 className='text-5xl sm:text-6xl font-heading font-bold'>Find Your Next Game</h2>
            <p className='text-lg py-4'>Create a user and join us today!</p>
          </div>
          <div className='my-auto'>
            <div className='tabs tabs--primary'>
              <div className='tabs__container'>
                <a onClick={() => {setTabOpen(!tabOpen)}} className={tabOpen ? 'tabs__label tabs__label--active' : 'tabs__label'}>
                  Log In
                </a>
                <span className='tabs__spacer'>|</span>
                <a onClick={() => {setTabOpen(!tabOpen)}} className={tabOpen ? 'tabs__label' : 'tabs__label tabs__label--active'}>
                  Register
                </a>
              </div>
              { tabOpen === true &&
                <Login />
              }
              { tabOpen === false &&
                <Register />
              }
            </div>
          </div>
        </div>
      </div>
  </Layout>
  )
}
