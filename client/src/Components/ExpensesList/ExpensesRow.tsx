import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import Expense from '../../classes/expenses/Expense';
import { componentStyles } from './componentStyles';

interface IExpensesRowProps {
    expense: Expense;
    editMode?: boolean;
}

type ExpensesRowProps = IExpensesRowProps;

const useStyles = makeStyles({
    ...componentStyles,
});

const ExpensesRow = (props: IExpensesRowProps) => {
    const classes = useStyles();
    const {expense, editMode} = props;
    const [confirm, setConfirm] = useState(false);

    const confirmDelete = () => {
        console.log('Confirmed Delete');
        setConfirm(false);
    };

    return useObserver(() => <TableRow>
        <TableCell
            className={classes.dateColumn}
            align="left">{expense.date.format('YYYY-MM-DD')}</TableCell>
        <TableCell align="left">{expense.description}</TableCell>
        <TableCell align="left">{expense.vendor}</TableCell>
        <TableCell
            className={classes.moneyColumn}
            align="right">{expense.amount.toFormat('$0,0.00')}</TableCell>
        <TableCell
            className={classes.moneyColumn}
            align="right">{expense.hst.toFormat('$0,0.00')}</TableCell>

        {editMode
         ? <React.Fragment><TableCell
                onClick={() => {console.log('edit');}}
                className={classes.editColumn}
                align="right">
                <IconButton
                    color='primary'
                    onClick={() => {console.log('edit');}}>
                    <EditIcon />
                </IconButton>
            </TableCell>
                <TableCell
                    className={classes.editColumn}
                    align="right">
                    <IconButton
                        color='secondary'
                        onClick={() => {setConfirm(true);}}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
                <Dialog
                    open={confirm}
                    onClose={() => {setConfirm(false);}}>
                    <DialogTitle>Delete this expense?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This cannot be undone.
                        </DialogContentText>
                        <DialogActions>
                            <Button
                                onClick={() => {setConfirm(false);}}
                                color="primary">
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmDelete}
                                variant="contained"
                                color="secondary"
                                autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
         </React.Fragment>
         : null}
    </TableRow>);
};

export default ExpensesRow;