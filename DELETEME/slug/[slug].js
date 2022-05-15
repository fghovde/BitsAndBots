import { BASE_URL, CLIENT_ID, ACCESS_TOKEN } from '../../constants/constants';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { igdbSettings, igdbGenresSettings } from '../../lib/igdbSettings';
import Layout from '../../components/layout/Layout';



export async function getStaticPaths() {
    const genres = await fetch(BASE_URL + '/genres', igdbGenresSettings);
    const data = await genres.json();
    const paths = data.map(data => {
        return {
            params: { slug: data.slug.toString(),
                        id: data.id.toString() }
        }
    })


    return {
       paths,
       fallback: false,
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
        body: 'fields name,id,genres.*,cover.*,screenshots.*;limit 32;sort rating asc;where tags = (1,5);'
    }

    const res = await fetch(BASE_URL + '/games/', igdbSpecificSettings);
    const data = await res.json();
    const listRes = await fetch(BASE_URL + '/genres', igdbGenresSettings);
    const listData = await listRes.json();
    console.log(listData);

    return {
        props: {
            games: data,
            cover: data.cover || null,
            category: listData,
        }
    }
}


/*
export const getStaticProps = async (context) => {
    let specificSlug = context.params.slug;
    const res = await fetch(BASE_URL + '/genres/' + context.params.slug, igdbSettings);
    const data = await res.json();
    const listRes = await fetch(BASE_URL + '/genres', igdbGenresSettings);
    const listData = await listRes.json();
    console.log(context.params.slug);

    return {
        props: {
            games: data,
            category: listData
        }
    }
}
*/
/*
export const getServerSideProps = async () => {
    const res = await fetch('https://www.igdb.com/genres/arcade', igdbSettings);
    const data = await res.json();

    return {
        props: {
            gamesUpdate: data,
        }
    }
} */


const Slug = ({ games, category }) => {
    console.log(games);
    const router = useRouter();
    
    
    const handleClick = async (e) => {
        console.log(e.target.name);
        router.replace(router.asPath);
        
        
        /*
        const clickRes = await fetch(BASE_URL + '/' + e.target.name, igdbGenresSettings);
        const clickData = await clickRes.json();
        console.log(clickData);
        return {
            props: {
                games: clickData,
            }
        } */
    }

    return (
        <>
        <Layout>
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-2 mb-4'> {/* list */}
            {category.map(category => (
                <>
                <div key={category.id}
                    className='max-w-xs rounded-lg bg-skin-fill'>
                    <div className='p-2'>
                            <button id={category.id} name={category.slug} type="button" onClick={handleClick} className='font-bold tracking-tight text-white'>
                                    {category.name}
                            </button>
                    </div>
                </div>
                </>
            ))}
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4'>
            
            {games.map(game => (
                <>
                <div key={game.id}
                    className='max-w-xs rounded-lg bg-skin-fill'> 
                    { game.cover !== undefined &&
                    <a href={'/browse/' + game.id}>
                    <Image
                        className='rounded-t-lg'
                        src={'https://images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.jpg'}
                        width={game.cover.width}
                        height={game.cover.height}
                        alt={game.name}>
                    </Image>
                    </a>
                    }
                    <div className='p-2'>
                        <Link href={'/browse/' + game.id} passHref>
                            <a>
                                <h3 className='mb-1 text-1lg font-bold tracking-tight text-white'>
                                    {game.name.substring(0,24)}
                                    {game.name.length > 24 &&
                                     ' ...'
                                    }
                                </h3>
                            </a>
                        </Link>
                        <p className='text-white'>
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

export default Slug;