import React, { FunctionComponent } from 'react';
import store from "../store";
import { useObserver } from 'mobx-react';
import { makeStyles } from "@material-ui/core/styles";

interface IExpensesListControllerProps {}

type ExpensesListControllerProps = IExpensesListControllerProps;

const useStyles = makeStyles({
    ExpensesListController: {},
});

const ExpensesListController: FunctionComponent<IExpensesListControllerProps> = (props: ExpensesListControllerProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <div className={classes.ExpensesListController}>
            ExpensesListController
        </div>
    ));
};

export default ExpensesListController;