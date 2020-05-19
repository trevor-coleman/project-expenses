import { Box, Paper, Toolbar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps, Router } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import ExpensesList from '../Components/ExpensesList';
import ExpensesTabNav from '../Components/ExpensesList/ExpensesTabNav';
import store from '../store';

interface IProjectProps extends RouteComponentProps {
    projectId?: string;
}

type ProjectProps = IProjectProps;

const useStyles = makeStyles({
    Project: {}, ProjectName: {
        paddingBottom: 10,
    }, topPaper: {},
});

interface TabRouteProps extends PropsWithChildren<RouteComponentProps> {
    index: number;
    projectId: string | undefined;
}

const Summary = (props: TabRouteProps) => {
    return <Box p={3}>
        <List>
            <ListItem>Total
                Expenses: {store.data.totals.totalAmount.toFormat(`$0.00`)}</ListItem>
            <ListItem>Total HST: {store.data.totals.totalHST.toFormat(`$0.00`)}</ListItem>
        </List> </Box>
};

const Expenses = (props: TabRouteProps) => {

    return  <Box p={3}><ExpensesList/></Box>
};

const Orders = (props: TabRouteProps) => {
    return <Box p={3}>
        <Typography variant={'h2'}>Orders</Typography>
    </Box>;

};

const ProjectInspector: FunctionComponent<IProjectProps> = (props: ProjectProps) => {
    const classes = useStyles();
    const {projectId} = props;
    const {project} = store.data;
    const [value, setValue] = React.useState(0);
    const state = store.ui.projectInspector;

    if (projectId) {
        store.data.setProject(projectId);
    }

    return useObserver(() => {
        return (
            <div className={classes.Project}>
                <Paper>
                    <div>
                        <Router>
                            <Summary index={0} projectId={projectId} path={"/"}/>
                            <Expenses index={0} projectId={projectId} path={"expenses"}/>
                            <Orders index={0} projectId={projectId} path={"orders"}/>
                        </Router>
                    </div>
                </Paper>
            </div>);
    });
};

export default ProjectInspector;


