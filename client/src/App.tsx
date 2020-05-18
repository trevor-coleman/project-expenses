import Container from '@material-ui/core/Container';
import React from 'react';
import ProjectList from './Components/ProjectList/';
import NavAndSidebar from './Layout/NavAndSidebar';
import ProjectsRoute from './Routes/Projects/ProjectsRoute';
import ProjectInspector from './Views/ProjectInspector';
import logo from './logo.svg';
import './App.css';
import { makeStyles, ThemeProvider } from '@material-ui/styles';

import theme from './Theme'

const useStyles = makeStyles({
    background: {
        backgroundColor: '#eee'
    }
});

function App() {
    const classes = useStyles()
  return (
    <div><ThemeProvider theme={theme}>
        <NavAndSidebar>
            <ProjectsRoute><Container>
                <ProjectInspector />
            </Container></ProjectsRoute>
        </NavAndSidebar>
    </ThemeProvider></div>
  );
}

export default App;
