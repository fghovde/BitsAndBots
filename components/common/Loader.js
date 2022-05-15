/* eslint-disable @next/next/no-img-element */
const Loader = () => {
    return (
        <div className='loader__container'>
            <div>
                <img className='loader__icon' src='/gfx/icons/spinner.svg' alt='Loading indicator' />
                <p className='loader__text'>Loading ...</p>
            </div>
        </div>
    );
  };

  export default Loader;