import { Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import Project from '../../classes/projects/Project';
import theme from '../../Theme/theme';

interface IProjectListRowProps {
    project: Project;
}

type ProjectListRowProps = IProjectListRowProps;

const useStyles = makeStyles({
    ProjectListRow: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
});

const ProjectListRow: FunctionComponent<IProjectListRowProps> = (props: ProjectListRowProps) => {
    const classes = useStyles();
    const {project} = props;

    const handleClick = (projectId: string) => {
        navigate(`/project/${projectId}`);
    };

    return useObserver(() => (
        <ListItem
            className={classes.ProjectListRow}
            key={project._id.toString()}
            button
            divider
            onClick={() => handleClick(project._id.toString())}>
            <Typography variant={'subtitle1'}>{project.name}</Typography>
        </ListItem>));
};

export default ProjectListRow;