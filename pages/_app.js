import Layout from '../components/layout/Layout';
import Loader from '../components/common/Loader';
import {useState, useEffect} from 'react';
import Router from 'next/router';
import { useLocalStorage } from '../hooks/useLocalStorage'
import '../styles/styles.css';

function BitsAndBots({Component, pageProps}) {
      const [loggedIn, setLoggedIn] = useLocalStorage('loggedin', false);
      useEffect(() => {
         if (loggedIn === false) {
           Router.push('/')
         }
       }, [loggedIn]);
      const [loading, setLoading] = useState(false);
      useEffect(() => {
         const start = () => {
         setLoading(true);
      };
      const end = () => {
         setLoading(false);
      };
      Router.events.on('routeChangeStart', start);
      Router.events.on('hashChangeStart', start);
      Router.events.on('routeChangeComplete', end);
      Router.events.on('hashChangeComplete', end);
      Router.events.on('routeChangeError', end);
      return () => {
         Router.events.off('routeChangeStart', start);
         Router.events.off('hashChangeStart', start);
         Router.events.off('routeChangeComplete', end);
         Router.events.off('hashChangeComplete', end);
         Router.events.off('routeChangeError', end);
      };
   }, []);

   return (
      <>
         {!loading ? (
            <Component {...pageProps} />
         ) : (
            <Layout>
               <Loader />
            </Layout>
         )}
      </>
   );
}

export default BitsAndBots;