import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import React, { FunctionComponent, useState } from 'react';
import store from '../../store'
import { useObserver } from 'mobx-react';
import { makeStyles } from "@material-ui/core/styles";
import ExpensesRow from './ExpensesRow';

interface IExpensesListProps {}

type ExpensesListProps = IExpensesListProps;

const styles={
    expensesList: {},
    expenseHeader:{
        marginBottom: 10,
    },
    moneyColumn:{
        width:100
    },
    dateColumn:{
        width:100
    }
}

const useStyles = makeStyles(styles);



const ExpensesList: FunctionComponent<IExpensesListProps> = (props: ExpensesListProps) => {
    const classes = useStyles();
    const {expenses} = store.data;
    const [editing, setEditing] = useState(false)

    return useObserver(() => (
        <div className={classes.expensesList}>
            <Typography className={classes.expenseHeader} variant={"h6"}>Expenses</Typography>
            <Button variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={()=>setEditing(!editing)}
            > Add New Expense</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.dateColumn} align="left">Date</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Vendor</TableCell>
                        <TableCell className={classes.moneyColumn} align="right">Amount</TableCell>
                        <TableCell className={classes.moneyColumn} align="right">HST</TableCell>
                    </TableRow>
                    {editing?
                        <TableRow>
                        <TableCell className={classes.dateColumn} align="left"><TextField/></TableCell>
                        <TableCell align="left"><TextField/></TableCell>
                        <TableCell align="left"><TextField/></TableCell>
                        <TableCell className={classes.moneyColumn} align="right"><TextField/></TableCell>
                        <TableCell className={classes.moneyColumn} align="right"><TextField/></TableCell>
                    </TableRow>:<TableRow/>}
                    {editing?<TableRow>
                    <TableCell className={classes.dateColumn} align="left"/>
                    <TableCell align="left"/>
                    <TableCell align="left"/>
                        <TableCell className={classes.moneyColumn} align="right"><Button variant={"outlined"} color={'secondary'}>Cancel</Button></TableCell>
                    <TableCell className={classes.moneyColumn} align="right"><Button variant={"contained"} color={'primary'}>Save</Button></TableCell>
                </TableRow>:<TableRow/>}

                </TableHead>
                <TableBody>
                {expenses.map((expense)=><ExpensesRow expense={expense} key={expense._id.toString()}/>)}
                </TableBody>
            </Table>

        </div>
    ));
};

export default ExpensesList;