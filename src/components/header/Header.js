import React, { useEffect, useRef } from 'react'
import Logo from '../../assets/tmovie.png'
import { Link, useLocation } from 'react-router-dom'
import './header.scss'
const headerNav = [
    {
        display: 'Home',
        path: '/'

    },
    {
        display: 'Movies',
        path: '/movie'

    },
    {
        display: 'Tv series',
        path: '/tv'

    },
]
const Header = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        const shrinkHaeder = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHaeder)
        return () => {
            window.removeEventListener('scroll', shrinkHaeder)
        }
    }, [])
    const headerRef = useRef(null)

    const active = headerNav.findIndex(e => e.path === pathname)
    return (
        <div ref={headerRef} className='header'>
            <div className='header__wrap container'>
                <div className='logo'>
                    <img src={Logo} alt='' />
                    <Link to='/'>tMovies</Link>
                </div>
                <ul className='header__nav'>
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header