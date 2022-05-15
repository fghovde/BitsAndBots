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

    useEffect(() => {
        setItems([]);
    });

    const handleGenre = (e) => {
        setCurrentGenre(e.target.name);
    }
    const unique = [...new Set(genres.map(genres => genres.genres[0].name))];

    const list = items;

    const addToCart = (e) => {
        // items.includes(e.target.name)
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

    const handleClick = ind => e => {
        // if target id is in array then
        const list = [...items];
        const index = list.indexOf(ind);
        list.splice(index, 1);
        setItems([...list]);
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
        <div open={open} setOpen={setOpen}> {/* accordion */}
            <div className='text-skin-inverted' onClick={() => {
                setOpen(!open)
                }}>
                {open ? (
                <button className='bg-skin-success p-3 rounded-3xl w-full font-bold hover:bg-skin-success-hover'>
                    <img
                        className='inline-flex mx-2'
                        src='/gfx/icons/category-inv.svg'
                        width='20px'
                        height='20px'
                        alt='Genre icon' />
                    Select genres
                </button>
                ) : (
                <button className='bg-skin-success p-3 rounded-3xl rounded-b-none w-full font-bold'>
                    <img
                        className='inline-flex mx-2 transform rotate-180'
                        src='/gfx/icons/category-inv.svg'
                        width='20px'
                        height='20px'
                        alt='Genre icon' />
                    Select genres
                </button>
                )}
            </div>
            <div className={open ? 'hidden' : 'grid xl:grid-flow-col xl:grid-cols-none md:grid-cols-2 mb-4 bg-skin-success gap-1 p-3 pt-0 rounded-3xl rounded-t-none'} onClick={() => {
                setOpen(!open)
                }}>
                {unique
                .map(unique => (
                    <button
                        type='button'
                        key={unique}
                        name={unique}
                        className='font-bold tracking-wide gap-4 text-white text-sm lg:text-xs p-2 bg-skin-base hover:bg-skin-fill rounded-3xl'
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
                    { game.cover !== undefined ? (
                    <a href={'/browse/' + game.id}>
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