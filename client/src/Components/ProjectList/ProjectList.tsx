import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import { Project } from '../../classes/Schema';
import store from '../../store';

interface IProjectListProps {
    projects: Project[]
}

type ProjectListProps = IProjectListProps;

const useStyles = makeStyles({
    ProjectList: {},
});

const ProjectList: FunctionComponent<IProjectListProps> = (props: ProjectListProps) => {
    const classes = useStyles();
    const {projects} = props;

    return useObserver(() => (
        <div className={classes.ProjectList}>
            <List>{
                projects.map((project) => <ListItem key={project._id.toString()} button
                                                    onClick={() => store.setProject(project._id)}><ListItemText
                    primary={project.name} secondary={project._id}/></ListItem>)}</List>
        </div>
    ));
};

export default ProjectList;