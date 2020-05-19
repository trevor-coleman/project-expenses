import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import './App.css';
import NavAndSidebar from './Layout/NavAndSidebar';
import ProjectsRoute from './Routes/Projects/ProjectsRoute';
import theme from './Theme';
import ProjectInspector from './Views/ProjectInspector';
import { Router, Link } from "@reach/router"

function App() {
    return (
        <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <ThemeProvider theme={theme}>
                    <NavAndSidebar>
                        <Router>
                        <ProjectsRoute path={'/project/*'}/>
                        </Router>
                    </NavAndSidebar>
                </ThemeProvider>
            </MuiPickersUtilsProvider></div>);
}

export default App;

