import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from '@reach/router';
import axios from 'axios';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import theme from '../../Theme';
import SectionHeader from '../SectionHeader';
import { ApiGETButton } from './Controls/ApiGETButton';

interface IDebugPanelProps extends RouteComponentProps {
    projectId?:string;
}

type DebugPanelProps = IDebugPanelProps;

const useStyles = makeStyles({
    DebugPanel: {},
    divider: {
        marginBottom: theme.spacing(3),
    },
});


const ProjectDebugPanel: FunctionComponent<IDebugPanelProps> = (props: DebugPanelProps) => {
    const classes = useStyles();
    const {projectId} = props;
    return useObserver(() => (
        <div className={classes.DebugPanel}>
            <Box p={3}>
                <SectionHeader>Project Debug</SectionHeader>
                <Divider className={classes.divider} /> < ApiGETButton path={`/api/project/${projectId}/totals`}  handleResponse={(response)=>{console.log(response.data)}}/>
            </Box>
        </div>));
};

export default ProjectDebugPanel;