import React from 'react';
import { render } from 'react-dom';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { config } from './overmind';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';

const overmind = createOvermind(config, {
    devtools: true,
});

function renderApp() {
    render(
        <Provider value={overmind}>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={App} />
                </Switch>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
}

renderApp();

if(module.hot) {
    module.hot.accept(renderApp);
}
