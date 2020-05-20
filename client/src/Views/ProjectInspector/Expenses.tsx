import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import ExpensesList from '../../Components/ExpensesList';

interface IExpensesProps extends RouteComponentProps {}

type ExpensesProps = IExpensesProps;

const useStyles = makeStyles({
    Expenses: {},
});

const Expenses: FunctionComponent<IExpensesProps> = (props: ExpensesProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <Box p={3}><ExpensesList /></Box>));
};

export default Expenses;