/* eslint-disable @next/next/no-img-element */
import { BASE_URL, CLIENT_ID, ACCESS_TOKEN } from '../constants/constants';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import coverNa from '../public/gfx/cover_na.jpg';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const getStaticProps = async () => {
    let igdbSpecificSettings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': CLIENT_ID,
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        body: 'fields name,id,genres.*,cover.*;limit 70;sort rating asc;where rating > 90;'
    }
    const res = await fetch(BASE_URL + '/' + 'games', igdbSpecificSettings);
    const data = await res.json();

    return {
        props: {
            games: data,
            genres: data,
        }
    }
}


const Browse = ({ games, genres }) => {
    const [currentGenre, setCurrentGenre] = useState('Role-playing (RPG)');
    const [items, setItems] = useLocalStorage('cart', []);
    const [open, setOpen] = useState(true);

  //  useEffect(() => {
  //      useLocalStorage
  //  }, [items]);

    const handleGenre = (e) => {
        setCurrentGenre(e.target.name);
    }
    const unique = [...new Set(genres.map(genres => genres.genres[0].name))];

    const list = items;

    const addToCart = (e) => {
        // items.includes(e.target.name)
        e.currentTarget.style = 'background-color: #F687FD;';
        const id = list.length + e.target.id;
        setItems(
            [
                ...list,
                {
                    id,
                    Name: `${e.target.name}`,
                }
              ]
        );
    }

    return (
        <>
        <Layout>
        <Head>
            <title>Browse | Bits&Bots</title>
            <meta name='description' content='Find your next game today!' />
            <meta name='keywords' content='game, games, video, shop, store, buy, pc, xbox, nintendo, switch, ps, playstation, microsoft' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <div open={open} setOpen={setOpen}>
            <div className='text-skin-inverted' onClick={() => {
                setOpen(!open)
                }}>
                {open ? (
                <button className='filter__button'>
                    <img
                        className='filter__icon'
                        src='/gfx/icons/category-inv.svg'
                        width='20px'
                        height='20px'
                        alt='Genre icon' />
                    Select genres
                </button>
                ) : (
                <button className='filter__button filter__button--open'>
                    <img
                        className='filter__icon filter__icon--open'
                        src='/gfx/icons/category-inv.svg'
                        width='20px'
                        height='20px'
                        alt='Genre icon' />
                    Select genres
                </button>
                )}
            </div>
            <div className={open ? 'filter__container--hidden' : 'filter__container'} onClick={() => {
                setOpen(!open)
                }}>
                {unique
                .map(unique => (
                    <button
                        type='button'
                        key={unique}
                        name={unique}
                        className='filter__item'
                        onClick={handleGenre}>
                    {unique}
                    </button>
                ))}
            </div>
        </div>
        <h2 className='py-4 text-xl font-bold'>{currentGenre}</h2>
        <div className='cards'>
            {games
            .filter(genre => genre.genres[0].name === currentGenre)
            .map(game => (
                <>
                <div key={game.id} className='cards__container'>
                    <button
                        className='cards__button'
                        onClick={addToCart}
                        id={game.id}
                        name={game.name}>
                        {/* {inCart ? ('+') : ('-')} */}
                    </button>
                    { game.cover ? (
                    <a href={'/browse/' + game.id} key={game.id}>
                        <Image
                            className='cards__image'
                            src={'https://images.igdb.com/igdb/image/upload/t_cover_med/' + game.cover.image_id + '.jpg'}
                            width={game.cover.width}
                            height={game.cover.height}
                            alt={game.name}>
                        </Image>
                    </a>
                    ) : (
                    <a href={'/browse/' + game.id}>
                        <Image
                            className='cards__image'
                            src={coverNa}
                            width='264'
                            height='352'
                            alt='No cover available'>
                        </Image>
                    </a>
                    )
                    }
                    <div className='p-2'>
                        <Link href={'/browse/' + game.id} passHref>
                            <a>
                                <h3 className='cards__text cards__text--title'>
                                    {game.name.substring(0,24)}
                                    {game.name.length > 24 &&
                                     ' ...'
                                    }
                                </h3>
                            </a>
                        </Link>
                        <p className='cards__text'>
                            {game.genres[0].name.substring(0,15)}
                            {game.genres[0].name.length > 12 &&
                             ' ...'
                            }
                        </p>
                    </div>
                </div>
                </>
            ))}
        </div>
        </Layout>
        </>
    );
}

export default Browse;