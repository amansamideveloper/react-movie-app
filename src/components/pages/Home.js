import React from 'react'
import { Link } from 'react-router-dom'
import MovieList from '../movie-list/MovieList'
import { OutLineButton } from '../button/Button'
import HeroSlide from '../hero-slide/HeroSlide'
import { category, movieType, tvType } from '../../api/tmdbApi'
const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className='container'>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutLineButton className="small">View more</OutLineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated</h2>
                        <Link to="/movie">
                            <OutLineButton className="small">View more</OutLineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Upcoming </h2>
                        <Link to="/movie">
                            <OutLineButton className="small">View more</OutLineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.upcoming} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Tv Shows </h2>
                        <Link to="/tv">
                            <OutLineButton className="small">View more</OutLineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated </h2>
                        <Link to="/tv">
                            <OutLineButton className="small">View more</OutLineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>

            </div>
        </>
    )
}

export default Home