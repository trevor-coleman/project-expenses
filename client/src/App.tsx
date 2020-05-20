import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { Router } from '@reach/router';
import React from 'react';
import './App.css';
import Navigation from './Layout/Navigation';
import HomeRoute from './Routes/HomeRoute';
import ProjectsRoute from './Routes/Projects/ProjectsRoute';
import theme from './Theme/theme';

function App() {
    return (
        <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <ThemeProvider theme={theme}>
                    <Navigation>
                        <Router>
                            <ProjectsRoute path={'/project/*'} />
                            <HomeRoute path={'/'} />
                        </Router>
                    </Navigation>
                </ThemeProvider>
            </MuiPickersUtilsProvider></div>);
}

export default App;

