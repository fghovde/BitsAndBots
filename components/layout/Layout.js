{/* import Footer from './footer' */}
import Navbar from '../navbar/Navbar';
import ImageSlider from '../slider/Imageslider';

export default function Layout({ children, home }) {
    return (
    <>
      {home ? (
        <>
          <ImageSlider
          images={[
            '/images/bg/bg-1.jpg',
            '/images/bg/bg-2.jpg',
            '/images/bg/bg-3.jpg',
            '/images/bg/bg-4.jpg',
            '/images/bg/bg-5.jpg',
            '/images/bg/bg-6.jpg',
            ]}>
              {children}
          </ImageSlider>
        </>
      ) : (
        <div className='layout layout--primary'>
          <div className='layout__container'>
            <Navbar />
              {children}
          </div>
        </div>
      )}
    </>
    )
  }