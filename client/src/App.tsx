import React from 'react';
import NavAndSidebar from './Layout/NavAndSidebar';
import ProjectsRoute from './Routes/Projects/ProjectsRoute';
import ProjectInspector from './Views/ProjectInspector';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Theme'

function App() {
  return (
    <div><ThemeProvider theme={theme}>
        <NavAndSidebar>
            <ProjectsRoute>
                <ProjectInspector />
            </ProjectsRoute>
        </NavAndSidebar>
    </ThemeProvider></div>
  );
}

export default App;
