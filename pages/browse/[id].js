/* eslint-disable @next/next/no-img-element */
import { BASE_URL, CLIENT_ID, ACCESS_TOKEN } from '../../constants/constants';
import { igdbSettings } from '../../lib/igdbSettings';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Head from 'next/head';
import Image from 'next/image';
import Loader from '../../components/common/Loader';
import Layout from '../../components/layout/Layout';

export const getStaticPaths = async () => {
    const res = await fetch(BASE_URL + '/games', igdbSettings);
    const data = await res.json();

    const paths = data.map(game => {
        return {
            params: { id: game.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    let specificId = context.params.id;
    let igdbSpecificSettings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': CLIENT_ID,
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        body: 'fields id,name,summary,cover.*,screenshots.*; where id = ' + specificId + ';'
    }

    const res = await fetch(BASE_URL + '/games/', igdbSpecificSettings);
    const data = await res.json();

    return {
        props: {
            game: data[0],
            cover: data[0].cover || null,
            screenshots: data[0].screenshots || null,
        }
    }
}

const Details = ({ game, cover, screenshots }) => {
    const [items, setItems] = useLocalStorage('cart', []);

    const list = items;

    const addToCart = (e) => {
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

    if (!game) return <Loader />

    return (
        <>
        <Layout>
            <Head>
                <title>{game.name} | Bits&Bots</title>
                <meta name='description' content='Find your next game today!' />
                <meta name='keywords' content='game, games, video, shop, store, buy, pc, xbox, nintendo, switch, ps, playstation, microsoft' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div key={game.id} className="grid grid-row">
                <div className='grid sm:grid-flow-col gap-4 max-w-screen-md mx-auto sm:p-4 bg-skin-base'>
                    <div className='sm:max-w-xs max-w-full'>
                        { cover !== null &&
                        <Image
                            src={'https://images.igdb.com/igdb/image/upload/t_cover_big/' + cover.image_id + '.jpg'}
                            width={cover.width}
                            height={cover.height}
                            alt={game.name}>
                        </Image>
                        }
                        <button
                            className='text-skin-inverted bg-skin-success mt-2 p-3 rounded-3xl w-full font-bold hover:bg-skin-success-hover'
                            id={game.id}
                            name={game.name}
                            onClick={addToCart}>
                            <img
                                className='inline-flex mx-2'
                                src='/gfx/icons/cart_add-inv.svg'
                                width='20px'
                                height='20px'
                                alt='Add to cart icon' />
                            Add to cart
                        </button>
                    </div>
                    <div className='grid grid-flow-row'>
                        <h2 className='text-3xl font-heading font-bold pb-2'>{game.name}</h2>
                        <p className='pb-4'>{game.summary}</p>
                        <div className='grid grid-cols-2 gap-2 w-full max-w-screen-md mx-auto '>
                        {screenshots !== null &&
                        <>
                        {screenshots
                        .map(image => (
                            <>
                            <div key={image.id} className="w-full rounded-lg min-h-fit flex h-28">
                                <Image
                                src={'https://images.igdb.com/igdb/image/upload/t_screenshot_med/' + `${image.image_id}` + '.jpg'}
                                width={cover.width}
                                height={cover.height}
                                objectFit='contain'
                                alt={game.name}>
                                </Image>
                            </div>
                            </>
                        ))}
                        </>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}

export default Details;