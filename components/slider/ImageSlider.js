import { useState } from 'react';
import { useEffect } from 'react';

const ImageSlider = ({
    images = [],
    autoPlay = true,
    autoPlayTime = 3000,
    children,
    ... props
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(()=>{
        const timer = setTimeout(() => {
        const newSlideIndex =
        currentSlide > images.length - 1 ? 0 : currentSlide + 1;

            setCurrentSlide(newSlideIndex)
        }, autoPlayTime)

        return () => clearTimeout(timer)
    }, [currentSlide, autoPlayTime] )

    return (
        <>
        <div className='imageslider' {...props}>
            {images.map((images, index) => (
                <div
                style={{
                    backgroundImage: `url(${images})`,
                    marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
                }}
                className='imageslider__items'
                key={index}></div>
            ))}
            <div className='imageslider__children'>
                {children}
            </div>
        </div>
        </>
    )
}

export default ImageSlider;