import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import { RouteComponentProps } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import store from '../../store';
import ProjectListRow from './ProjectListRow';

interface IProjectListProps extends RouteComponentProps {
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
            <List>{projects.map((project) => (
                <ProjectListRow
                    key={project._id.toString()}
                    project={project}
                />))}
            </List>
        </div>));
};

export default ProjectList;