import { BASE_URL, CLIENT_ID, ACCESS_TOKEN } from '../constants/constants';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { igdbSettings, igdbGenresSettings } from '../lib/igdbSettings';
import Layout from '../components/layout/Layout';
import coverNa from '../public/gfx/cover_na.jpg';



/*
export async function getStaticPaths() {
    const genres = await fetch(BASE_URL + '/genres', igdbGenresSettings);
    const data = await genres.json();
    // generate a list of paths with route params
    const paths = data.map(data => ({ params: { genreSlug: data.slug }}))
  
    return {
       paths,
       fallback: false,
    }
  }
*/

export const getStaticProps = async () => {
    let igdbSpecificSettings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': CLIENT_ID,
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        body: 'fields name,id,genres.*,cover.*,screenshots.*;limit 70;sort rating asc;where rating > 90;'
    }
    const res = await fetch(BASE_URL + '/' + 'games', igdbSpecificSettings);
    const data = await res.json();
    const listRes = await fetch(BASE_URL + '/' + 'games', igdbSpecificSettings);
    const listData = await listRes.json();
    console.log(data);

    return {
        props: {
            games: data,
            category: listData
        }
    }
}
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


const Browse = ({ games, category }) => {
    const router = useRouter();
    const [currentGenre, setCurrentGenre] = useState('Shooter');
    const handleClick = async (e) => {
        setCurrentGenre(e.target.name);
        console.log(JSON.stringify(currentGenre));
        console.log(e.target.name);
        // router.push('/slug/' + e.target.name);
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
            {category
            .map(category => (
                <>
                <div key={category.id}
                    className='max-w-xs rounded-lg bg-skin-fill'>
                    <div className='p-2'>
                        <button id={category.id} name={category.genres[0].name} type="button" onClick={handleClick} className='font-bold tracking-tight text-white'>
                            {category.genres[0].name}
                        </button>
                    </div>
                </div>
                </>
            ))}
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4'>
            {games
            .filter(task => task.genres[0].name === currentGenre)
            .map(game => (
                <>
                <div key={game.id}
                    className='max-w-xs rounded-lg bg-skin-fill'> {/* card */}
                    { game.cover !== undefined ? (
                    <a href={'/browse/' + game.id}>
                    <Image
                        className='rounded-t-lg'
                        src={'https://images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.jpg'}
                        width={game.cover.width}
                        height={game.cover.height}
                        alt={game.name}>
                    </Image>
                    </a>
                    ) : (
                    <a href={'/browse/' + game.id}>
                    <Image
                        className='rounded-t-lg'
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

export default Browse;