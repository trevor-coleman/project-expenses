import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import store from '../../store';
import { componentStyles } from './componentStyles';
import ExpensesEditRow from './ExpensesEditRow';
import ExpensesRow from './ExpensesRow';

interface IExpensesListProps {}

type ExpensesListProps = IExpensesListProps;

const styles = {
    expensesList: {}, expenseHeader: {
        marginBottom: 10,
    }, ...componentStyles,
};

const defaultEvent = {};

const useStyles = makeStyles(styles);

const ExpensesList: FunctionComponent<IExpensesListProps> = (props: ExpensesListProps) => {
    const classes = useStyles();
    const {expenses} = store.data;
    const state = store.ui.expensesList;

    return useObserver(() => (
        <div className={classes.expensesList}>
            <Typography className={classes.expenseHeader} variant={"h6"}>Expenses</Typography>
            <Button variant={'outlined'}
                    size={"small"}
                    color={"secondary"}
                    startIcon={<AddIcon/>}
                    onClick={() => store.ui.setExpenseListEditing(true)}
            > Add New Expense</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.dateColumn} align="left">
                            <Typography variant={'subtitle1'}>
                                Date
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant={'subtitle1'}>
                                Description
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant={'subtitle1'}>
                                Vendor
                            </Typography>
                        </TableCell>
                        <TableCell className={classes.moneyColumn} align="right">
                            <Typography variant={'subtitle1'}>
                                Amount
                            </Typography>
                        </TableCell>
                        <TableCell className={classes.moneyColumn} align="right">
                            <Typography variant={'subtitle1'}>
                                HST
                            </Typography>
                        </TableCell>
                    </TableRow>
                    {state.editing
                     ? <ExpensesEditRow/>
                     : <TableRow/>}

                </TableHead>
                <TableBody>
                    {expenses.map((expense) => <ExpensesRow expense={expense} key={expense._id.toString()}/>)}
                </TableBody>
            </Table>

        </div>));
};

export default ExpensesList;