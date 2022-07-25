import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './movie-grid.scss'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import MovieCard from '../movie-card/MovieCard'
import Button, { OutLineButton } from '../button/Button'
import Input from '../input/Input'
import { useHistory } from 'react-router-dom'

const MovieGrid = props => {
    const [items, setItems] = useState([])
    const { keyword } = useParams();
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {}
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params })
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, { params })
            }
            setItems(response.results)
            setTotalPage(response.total_pages)
        }
        getList()
    }, [props.category, keyword])

    const loadmore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            }
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params })
            }
        } else {
            const params = {
                query: keyword,
                page: page + 1
            }
            response = await tmdbApi.search(props.category, { params })
        }
        setItems([...items, ...response.results])
        setPage(page + 1)
    }
    return (
        <>

            <MovieSearch category={props.category} keyword={keyword} />


            <div className='movie-grid'>
                {
                    items.map((item, i) => (
                        <MovieCard category={props.category} item={item} key={i} />
                    ))
                }
            </div>
            {
                page < totalPage ? (
                    <div className='movie-grid__loadmore'>
                        <OutLineButton className='small' onClick={loadmore}>Load more</OutLineButton>
                    </div>
                ) : null
            }
        </>
    )
}
const MovieSearch = props => {
    const history = useHistory()
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`${category[props.category]}/search/${keyword}`)
            }
        },
        [keyword, props.category, history]
    )
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch()
            }
        }
        document.addEventListener('keyup', enterEvent)
        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    }, [keyword, goToSearch])
    return (
        <div className='movie-search'>
            <Input
                type='text'
                placeholder='Enter keyword'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className='small' onClick={goToSearch}>Search</Button>
        </div>
    )
}
MovieGrid.propTypes = {}

export default MovieGrid