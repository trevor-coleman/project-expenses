import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import store from '../store';

interface IProjectListProps {

}

type ProjectListProps = IProjectListProps;

const useStyles = makeStyles({
    ProjectList: {},
});

const ProjectList: FunctionComponent<IProjectListProps> = (props: ProjectListProps) => {
    const classes = useStyles();
    const {projects} = store.data;

    return useObserver(() => (
        <div className={classes.ProjectList}>
            <List>{
                projects.map((project) => <ListItem key={project._id.toString()} button
                                                    onClick={() => store.data.setProject(project._id)}><ListItemText
                    primary={project.name} secondary={project._id}/></ListItem>)}</List>
        </div>
    ));
};

export default ProjectList;