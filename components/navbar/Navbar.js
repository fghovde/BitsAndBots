/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Link from 'next/link';
import Logo from './Logo'
import Logout from '../form/Logout';

function Navigation({open, setOpen}) {
    return (
        <div className={open ? 'menu menu--hidden' : 'menu'}>
            <div className='menu__container'>
                <Link href={'/browse'}>
                    <a className='menu__items' onClick={() => {setOpen(!open)}}>
                    <img className ='menu__icons' src='/gfx/icons/games.svg' width='24px' height='24px' alt='Games icon' />
                    Browse Games
                    </a>
                </Link>
                <Link href={'/cart'}>
                    <a className='menu__items' onClick={() => {setOpen(!open)}}>
                    <img className ='menu__icons' src='/gfx/icons/cart.svg' width='24px' height='24px' alt='Cart icon' />
                    Shopping Cart
                    </a>
                </Link>
                <Link href={'/'}>
                    <a className='menu__items' onClick={() => {setOpen(!open)}}>
                        <img className ='menu__icons' src='/gfx/icons/logout.svg' width='24px' height='24px' alt='Logout icon' />
                        <Logout />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(true);

    return (
        <nav className='navbar'>
            <Navigation open={open} setOpen={setOpen}/>
            <div className='navbar__container navbar__container--start'>
                <div className='navbar__icons' onClick={() => {
                    setOpen(!open)
                }}>
                    {open ? <img src='/gfx/icons/menu.svg' width='24px' height='24px' alt='Menu icon' /> : <img src='/gfx/icons/close.svg' width='24px' height='24px' alt='Close menu icon' />}
                </div>
            </div>
            <div className='navbar__container navbar__container--center'>
                <Logo />
            </div>
            <div className='navbar__container navbar__container--end'>
                <Link href={'/cart'} passHref>
                    <div className='navbar__icons'>
                        <img src='/gfx/icons/cart.svg' width='24px' height='24px' alt='Cart icon' />
                    </div>
                </Link>
            </div>
        </nav>
    )
}