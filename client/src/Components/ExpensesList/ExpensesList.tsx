import React, { FunctionComponent } from 'react';
import store from "../store";
import { useObserver } from 'mobx-react';
import { makeStyles } from "@material-ui/core/styles";

interface IExpensesListProps {}

type ExpensesListProps = IExpensesListProps;

const useStyles = makeStyles({
    ExpensesList: {},
});

const ExpensesList: FunctionComponent<IExpensesListProps> = (props: ExpensesListProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <div className={classes.ExpensesList}>
            ExpensesList
        </div>
    ));
};

export default ExpensesList;