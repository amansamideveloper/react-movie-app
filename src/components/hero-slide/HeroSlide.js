import React, { useEffect, useRef, useState } from 'react'
import './hero-slide.scss'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import apiConfig from '../../api/apiConfig'
import tmdbApi, { category, movieType } from '../../api/tmdbApi'
import Button, { OutLineButton } from '../button/Button'
import Modal, { ModalContent } from '../modal/Modal'
import { useHistory } from 'react-router-dom'
const HeroSlide = () => {

    const [movirItems, setMovieItems] = useState([])

    SwiperCore.use([Autoplay])

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 10))

            } catch (error) {
                console.log(error)
            }
        }
        getMovies()
    }, [])
    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grapCursor={true}
                spaceBetween={0}
                sliderPreview={1}

                autoplay={{ delay: 3000 }}
            >
                {movirItems.map((item, i) => (

                    <SwiperSlide key={i}>
                        {/* <img src={apiConfig.originalImage(item.backdrop_path)} alt='' /> */}
                        {({ isActive }) => (

                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}

            </Swiper>
            {
                movirItems.map((item, i) => <TrailerModel key={i} item={item} />)
            }
        </div>
    )
}
const HeroSlideItem = props => {
    let history = useHistory();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModalActive = async () => {

        const modal = document.querySelector(`#modal__${item.id}`)

        const videos = await tmdbApi.getVideos(category.movie, item.id)

        if (videos.results.length > 0) {
            const videoScr = 'https://www.youtube.com/embed/' + videos.results[0].key;

            modal.querySelector('.modal__content > iframe').setAttribute('src', videoScr)
        } else {
            modal.querySelector('.modal__content > iframe').innerHTML('No trailer')
        }
        modal.classList.toggle('active')
    }

    return (
        <div className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}>
            <div className='hero-slide__item__content container'>
                <div className='hero-slide__item__content__info'>
                    <h2 className='title'>{item.title}</h2>
                    <div className='overview'>{item.overview}</div>
                    <div className='btns'>
                        <Button onClick={() => history.push('/movie/' + item.id)}>
                            watch now
                        </Button>
                        <OutLineButton onClick={setModalActive}>
                            watch trailer
                        </OutLineButton>
                    </div>

                </div>
                <div className='hero-slide__item__content__poster'>
                    <img src={apiConfig.w500Image(item.poster_path)} alt='' />
                </div>
                <div className='hero-slide__item__content__poster'></div>

            </div>
        </div>
    )

}

const TrailerModel = props => {
    const item = props.item;

    const iframeRef = useRef(null)

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal__${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width='100%' height='500px' title='trailer' />
            </ModalContent>

        </Modal>
    )
}

export default HeroSlide