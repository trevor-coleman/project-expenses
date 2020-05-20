import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import { RouteComponentProps } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import store from '../../store';

interface IProjectsSidebarProps extends RouteComponentProps {}

type ProjectsSidebarProps = IProjectsSidebarProps;

const useStyles = makeStyles({
    ProjectSidebar: {},
});

const ProjectSidebar: FunctionComponent<IProjectsSidebarProps> = (props: ProjectsSidebarProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <div className={classes.ProjectSidebar}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <BusinessIcon/>
                    </ListItemIcon>
                    <Typography variant={'subtitle1'}>{store.data.project.name}</Typography>
                </ListItem>
            </List>
            <Divider />
        </div>));
};

export default ProjectSidebar;