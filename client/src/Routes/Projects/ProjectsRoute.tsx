import React, { FunctionComponent } from 'react';
import store from "../store";
import { useObserver } from 'mobx-react';
import { makeStyles } from "@material-ui/core/styles";

interface IProjectsRouteProps {}

type ProjectsRouteProps = IProjectsRouteProps;

const useStyles = makeStyles({
    ProjectsRoute: {},
});

const ProjectsRoute: FunctionComponent<IProjectsRouteProps> = (props: ProjectsRouteProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <div className={classes.ProjectsRoute}>
            ProjectsRoute
        </div>
    ));
};

export default ProjectsRoute;