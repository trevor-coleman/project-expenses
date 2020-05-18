import { Box } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import store from "../../store";
import { useObserver } from 'mobx-react';
import { makeStyles } from "@material-ui/core/styles";
import theme from '../../Theme';
import ProjectInspector from '../../Views/ProjectInspector';

interface IProjectsRouteProps{}

type ProjectsRouteProps = IProjectsRouteProps;

const useStyles = makeStyles({
    ProjectsRoute:{
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});



const ProjectsRoute: FunctionComponent<IProjectsRouteProps> = (props: PropsWithChildren<ProjectsRouteProps>) => {
    const classes = useStyles();
    const children = {props}
    const [value, setValue] = React.useState(0);

    return useObserver(() => (
        <div className={classes.ProjectsRoute}>
            <ProjectInspector/>
        </div>
    ));
};

export default ProjectsRoute;