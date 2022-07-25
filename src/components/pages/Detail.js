import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import './Detail.scss'
import CastList from './CastList'
import VedioList from './VedioList'
import MovieList from '../../components/movie-list/MovieList'
const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null)

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} })

            // console.log(response)
            setItem(response)
            window.scrollTo(0, 0)
            // try {
            //     console.log(await tmdbApi.detail(category, id, { params: {} }))
            // } catch (error) {
            //     console.log(error)
            // }
        }
        getDetail()
    }, [id, category])
    // console.log(apiConfig.originalImage(
    //     item.backdrop_path || item.poster_path))
    // console.log(item)
    return (
        <>
            {item && (
                <>
                    <div className='banner' style={{
                        backgroundImage: `url(${apiConfig.originalImage(
                            item.backdrop_path || item.poster_path
                        )})`
                    }}>
                    </div>
                    <div className='mb-3 movie-content container'>
                        <div className='mb-3 movie-content__poster'>
                            <div className='mb-3 movie-content__poster__img' style={{
                                backgroundImage: `url(${apiConfig.originalImage(
                                    item.backdrop_path || item.poster_path
                                )})`
                            }}>

                            </div>
                        </div>
                        <div className='mb-3 movie-content__info'>
                            <h1 className='title'>
                                {item.title || item.name}
                            </h1>
                            <div className='genres'>
                                {item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                    <span className='genres__item' key={i}>{genre.name}</span>
                                ))}
                            </div>
                            <p className='overview'>{item.overview}</p>
                            <div className='cast'>
                                <div className='section__header'>
                                    <h2>Casts</h2>
                                </div>
                                {/*  */}
                                <CastList id={item.id} />
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='section mb-3'>
                            <VedioList id={item.id} />
                        </div>
                    </div>
                    <div className='container'>
                        <div className='section__header mb-2'>
                            <h2>Similar</h2>

                        </div>
                        <MovieList category={category} type='similar' id={item.id} />
                    </div>
                </>

            )}
        </>
    )
}

export default Detail