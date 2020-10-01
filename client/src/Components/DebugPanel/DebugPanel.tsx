import { Button, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Router } from '@reach/router';
import React, { FunctionComponent } from 'react';
import store from '../../store';
import { useObserver } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import theme from '../../Theme';
import ProjectDebugPanel from './ProjectDebugPanel';

interface IDebugPanelProps {}

type DebugPanelProps = IDebugPanelProps;

const useStyles = makeStyles({
    debugPanel: {
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(3)

    },
});

const DebugPanel: FunctionComponent<IDebugPanelProps> = (props: DebugPanelProps) => {
    const classes = useStyles();

    return useObserver(() => (

            <Container><Paper className={classes.debugPanel} elevation={12}><Router>
                <ProjectDebugPanel path={"/project/:projectId/*"} />

            </Router></Paper>
            </Container>

        ));
};

export default DebugPanel;