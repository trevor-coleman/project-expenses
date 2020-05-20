import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useObserver } from 'mobx-react';
import React, { PropsWithChildren } from 'react';

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
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

interface INavAndSidebarProps {

}

type NavAndSidebarProps = INavAndSidebarProps

export default function Navigation(props: PropsWithChildren<NavAndSidebarProps>) {
    const classes = useStyles();
    const {children} = props;

    return useObserver(() => {
        return <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <Container>
                    {children}
                </Container>
            </main>
        </div>;
    });
}