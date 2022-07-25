import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './App.scss'

import { BrowserRouter, Route } from 'react-router-dom'
import Router from './config/Router'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
function App() {
    return (
        <BrowserRouter>
            <Route render={props => (
                <>
                    <Header {...props} />
                    <Router />
                    <Footer />
                </>
            )} />
        </BrowserRouter>
    )
}

export default App