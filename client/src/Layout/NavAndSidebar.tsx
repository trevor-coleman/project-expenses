import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BusinessIcon from '@material-ui/icons/Business';
import { useObserver } from 'mobx-react';
import React, { PropsWithChildren } from 'react';
import ProjectList from '../Components/ProjectList';
import store from '../store';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1, padding: theme.spacing(3),
        },
    }),
);

export default function NavAndSidebar(props:PropsWithChildren<any>) {
    const classes = useStyles();
    const {children} = props;
    const {project} = store.data;
    const {viewType} = store.ui

    console.log(viewType);

    const viewLabel = () => {
        switch (viewType.root) {
            case 'project':
                return `- ${project.name}`
            default:
                return '';
        }
    }

    return useObserver(()=> {return <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        RZY Expenses {viewLabel()}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                            <ListItem button onClick={() => store.data.getProjects()}>
                                <ListItemIcon>
                                    <BusinessIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Projects"}/>
                            </ListItem>
                    </List>
                    <ProjectList/>
                    <Divider />
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                <Container>
                    {children}
                </Container>
            </main>
        </div>}
    )
}