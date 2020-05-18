import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { FunctionComponent } from 'react';
import { useObserver } from 'mobx-react';
import { makeStyles } from "@material-ui/core/styles";
import Expense from '../../classes/expenses/Expense';

interface IExpensesRowProps { expense: Expense }

type ExpensesRowProps = IExpensesRowProps;

const useStyles = makeStyles({
    moneyColumn:{
        width:100
    },
    dateColumn:{
        width:100
    }
});

const ExpensesRow = (props: IExpensesRowProps)=>{
    const classes = useStyles();
    const {expense} = props;
    return useObserver(()=><TableRow>
        <TableCell className={classes.dateColumn} align="center">{expense.amount.getLocale()}</TableCell>
        <TableCell align="left">{expense.description}</TableCell>
        <TableCell align="left">{expense.vendor}</TableCell>
        <TableCell className={classes.moneyColumn} align="right">{expense.amount.toFormat('$0,0.00')}</TableCell>
        <TableCell className={classes.moneyColumn} align="right">{expense.amount.toFormat('$0,0.00')}</TableCell>
    </TableRow>)
}

export default ExpensesRow;