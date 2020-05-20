import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import SectionHeader from '../../Components/SectionHeader';
import SummaryTable from '../../Components/SummaryTable';

interface ISummaryProps extends RouteComponentProps {}

type SummaryProps = ISummaryProps;

const useStyles = makeStyles({
    Summary: {},
    root: {
        flexGrow: 1,
    },
});

const Summary: FunctionComponent<ISummaryProps> = (props: SummaryProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <Box p={3}>
            <Grid
                container
                justify="space-between">
                <Grid item>
                    <SectionHeader>Summary</SectionHeader>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
            <Grid spacing={3}>
                <Grid
                    item
                    xs={12}>
                    <SummaryTable />
                </Grid>
            </Grid>
        </Box>));
};

export default Summary;