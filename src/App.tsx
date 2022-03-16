import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routeConfig from './routeConfig'

const App = () => {
    return (
        <div id="app">
            <BrowserRouter>
                <Switch>
                    {routeConfig.map((route, index) => (
                        <Route key={index} {...route} />
                    ))}
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
