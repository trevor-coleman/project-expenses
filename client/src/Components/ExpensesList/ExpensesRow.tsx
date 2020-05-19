import { makeStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useObserver } from 'mobx-react';
import React from 'react';
import Expense from '../../classes/expenses/Expense';
import { componentStyles } from './componentStyles';

interface IExpensesRowProps { expense: Expense }

type ExpensesRowProps = IExpensesRowProps;

const useStyles = makeStyles({
    ...componentStyles,
});

const ExpensesRow = (props: IExpensesRowProps)=>{
    const classes = useStyles();
    const {expense} = props;
    return useObserver(()=><TableRow>
        <TableCell className={classes.dateColumn} align="left">{expense.date.format('YYYY-MM-DD')}</TableCell>
        <TableCell align="left">{expense.description}</TableCell>
        <TableCell align="left">{expense.vendor}</TableCell>
        <TableCell className={classes.moneyColumn} align="right">{expense.amount.toFormat('$0,0.00')}</TableCell>
        <TableCell className={classes.moneyColumn} align="right">{expense.hst.toFormat('$0,0.00')}</TableCell>
    </TableRow>)
}

export default ExpensesRow;