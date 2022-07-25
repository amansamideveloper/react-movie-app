import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Home from '../components/pages/Home'
import Detail from '../components/pages/Detail'
import Catalog from '../components/pages/Catalog'

const Router = () => {
    return (
        <Switch>
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />
        </Switch>
    )
}

export default Router