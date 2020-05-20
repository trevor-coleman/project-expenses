import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { RouteComponentProps } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import store from '../../store';
import theme from '../../Theme/theme';
import SectionHeader from '../SectionHeader';
import { componentStyles } from './componentStyles';
import ExpensesEditRow from './ExpensesEditRow';
import ExpensesRow from './ExpensesRow';

interface IExpensesListProps extends RouteComponentProps {}

type ExpensesListProps = IExpensesListProps;

const styles = {
    topButton: {
        margin: theme.spacing(1),
    },
    expensesList: {},
    expenseHeader: {
        marginBottom: 10,
    }, ...componentStyles,
};

const defaultEvent = {};

const useStyles = makeStyles(styles);

const ExpensesList: FunctionComponent<IExpensesListProps> = (props: ExpensesListProps) => {
    const classes = useStyles();
    const {expenses} = store.data;
    const state = store.ui.expensesList;
    console.log('render');

    return useObserver(() => (
        <div className={classes.expensesList}>
            <Grid
                container
                justify="space-between">
                <Grid item>
                    <SectionHeader>Expenses</SectionHeader>
                </Grid>
                <Grid item>
                    <Button
                        className={classes.topButton}
                        variant={'outlined'}
                        size={'small'}
                        color={'primary'}
                        startIcon={<AddIcon />}
                        onClick={() => store.ui.setAddingNewExpense(true)}
                    > Add</Button>
                    {state.editingExpenseList
                     ? <Button
                         className={classes.topButton}
                         variant={'contained'}
                         size={'small'}
                         color={'primary'}
                         startIcon={<AddIcon />}
                         onClick={() => store.ui.setExpenseListEditMode(false)}
                     > Stop Editing
                     </Button>
                     : <Button
                         className={classes.topButton}
                         variant={'outlined'}
                         size={'small'}
                         color={'primary'}
                         startIcon={<EditIcon />}
                         onClick={() => store.ui.setExpenseListEditMode(true)}
                     > Edit </Button>}
                </Grid>
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            className={classes.dateColumn}
                            align="left">
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
                        <TableCell
                            className={classes.moneyColumn}
                            align="right">
                            <Typography variant={'subtitle1'}>
                                Amount
                            </Typography>
                        </TableCell>
                        <TableCell
                            className={classes.moneyColumn}
                            align="right">
                            <Typography variant={'subtitle1'}>
                                HST
                            </Typography>
                        </TableCell>
                        {state.editingExpenseList
                         ? <TableCell
                             className={classes.editColumn}
                             align="right" />
                         : null}

                    </TableRow>
                    {state.addingNewExpense
                     ? <ExpensesEditRow />
                     : <TableRow />}

                </TableHead>
                <TableBody>
                    {expenses.map((expense) => <ExpensesRow
                        editMode={state.editingExpenseList}
                        expense={expense}
                        key={expense._id.toString()} />)}
                </TableBody>
            </Table>

        </div>));
};

export default ExpensesList;