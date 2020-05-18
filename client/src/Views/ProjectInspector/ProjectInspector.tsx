import { Typography } from '@material-ui/core';
import { IObservableObject } from 'mobx';
import React, { FunctionComponent } from 'react';
import store from "../../store";
import { useObserver } from 'mobx-react';
import { makeStyles } from "@material-ui/core/styles";
import {Project} from '../../../../classes/Schema';

interface IProjectProps {
    project: any;
}

type ProjectProps = IProjectProps;

const useStyles = makeStyles({
    Project: {},
});

const ProjectInspector: FunctionComponent<IProjectProps> = (props: ProjectProps) => {
    const classes = useStyles();
    const {project} = props;

    return useObserver(() => (
        <div className={classes.Project}>
            <Typography variant={"h4"}>{
                project
                ? project.name
                : "No project"
            }</Typography>
            <Typography>{project._id}</Typography>

        </div>
    ));
};

export default ProjectInspector;