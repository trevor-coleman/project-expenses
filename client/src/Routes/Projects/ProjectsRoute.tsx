import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps, Router } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import theme from '../../Theme/theme';
import ProjectInspector from '../../Views/ProjectInspector/ProjectInspector';
import Projects from '../../Views/Projects';

interface IProjectsRouteProps extends RouteComponentProps {
    '*'?: string
}

type ProjectsRouteProps = IProjectsRouteProps;

const useStyles = makeStyles({
    ProjectsRoute: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

const ProjectsRoute: FunctionComponent<IProjectsRouteProps> = (props: PropsWithChildren<IProjectsRouteProps>) => {
    const classes = useStyles();
    const children = {props};
    const [value, setValue] = React.useState(0);

    return useObserver(() => (
        <div className={classes.ProjectsRoute}>
            <Router>
                <Projects path={'/'} />
                <ProjectInspector path={':projectId/*'} />
            </Router>
        </div>
    ));
};

export default ProjectsRoute;