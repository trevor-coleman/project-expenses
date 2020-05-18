import Container from '@material-ui/core/Container';
import React from 'react';
import ProjectList from './Components/ProjectList/';
import ProjectInspector from './Views/ProjectInspector';
import logo from './logo.svg';
import './App.css';
import {makeStyles} from '@material-ui/styles'
import NavAndSidebar from './Layout/NavAndSidebar';

const useStyles = makeStyles({
    background: {
        backgroundColor: '#eee'
    }
});

function App() {
    const classes = useStyles()
  return (
    <div>
        <NavAndSidebar>
            <Container>
                <ProjectInspector />
            </Container>
        </NavAndSidebar>
    </div>
  );
}

export default App;
