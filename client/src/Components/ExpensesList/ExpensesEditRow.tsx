import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import classNames from 'classnames';
import { useObserver } from 'mobx-react';
import moment from 'moment';
import React, { FunctionComponent, useState } from 'react';
import { parseDinero } from '../../classes/MyDinero';
import store from '../../store';
import theme from '../../Theme/theme';
import { componentStyles } from './componentStyles';
import MoneyField from './MoneyField';

interface IExpenseEditRowProps {}

type ExpensesEditRowProps = IExpenseEditRowProps;

const useStyles = makeStyles({
    ExpenseEditRow: {},
    fillWidth: {width: '100%'}, ...componentStyles,
    editCell: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    whiteBackground: {
        backgroundColor: 'white',
    },
    editRow: {
        backgroundColor: theme.palette.secondary.main,
    },
    buttonRow: {backgroundColor: theme.palette.secondary.main},
    buttonRowButtons: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
});

interface State {
    date: MaterialUiPickersDate;
    description: string;
    vendor: string;
    amount: string;
    hst: string;
}

const initialState = {
    date: moment(new Date()), description: "", vendor: "", amount: "", hst: "",
};

const ExpensesEditRow: FunctionComponent<ExpensesEditRowProps> = (props: ExpensesEditRowProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const [values, setValues] = useState<State>({
        ...initialState,
    });

    const [date, setDate] = useState(moment(new Date) as MaterialUiPickersDate);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        let change = name === 'amount'
                     ? {
                [name]: value, 'hst': parseDinero(value)
                    .multiply(0.13)
                    .toFormat('0.00'),
            }
                     : {
                [name]: value,
            };

        setValues({
            ...values, ...change,
        });
    };

    const stopEditingAndReset = (): void => {
        store.ui.setAddingNewExpense(false);
    };

    const saveAndSubmit = (): void => {
        const expenseFormData = {
            date: date as moment.Moment,
            description: values.description,
            vendor: values.vendor,
            amount: parseDinero(values.amount),
            hst: parseDinero(values.hst),
        };

        store.data.submitNewExpense(expenseFormData);

        setValues({...initialState});
    };

    return useObserver(() => (
        <React.Fragment>

            <TableRow className={classes.editRow}>
                <TableCell className={classNames(classes.dateColumn, classes.editCell)} align="left">
                    <KeyboardDatePicker
                        className={classNames(classes.whiteBackground, classes.dateColumn)}
                        label={"Date"}
                        variant="inline"
                        disableToolbar
                        onAccept={setDate}
                        format="YYYY-MM-DD"
                        disableFuture
                        keyboardIcon={<CalendarTodayIcon fontSize={"small"}/>}
                        name="date"
                        value={date}
                        onChange={setDate}
                        inputVariant="outlined"
                        margin={'dense'}
                    />
                </TableCell>
                <TableCell className={classNames(classes.editCell, classes.descriptionColumn)} align="left">
                    <TextField
                        className={classNames(classes.whiteBackground, classes.fillWidth)}
                        label={"Description"}
                        value={values.description}
                        onChange={handleChange}
                        name={'description'}
                        variant="outlined"
                        margin={'dense'}
                    />
                </TableCell>
                <TableCell
                    className={classNames(classes.editCell, classes.vendorColumn)}
                    align="left">
                    <TextField
                        className={classNames(classes.whiteBackground, classes.fillWidth)}
                        label={"Vendor"}
                        value={values.vendor}
                        onChange={handleChange}
                        name={'vendor'}
                        variant="outlined"
                        margin={'dense'}/>
                </TableCell>
                <TableCell
                    className={classNames(classes.editCell, classes.moneyColumn)}
                    align="right">
                    <MoneyField
                        className={classNames(classes.whiteBackground, classes.moneyColumn)}
                        value={values.amount}
                        onChange={handleChange}
                        name={'amount'}
                        label={'Total'}
                    />
                </TableCell>
                <TableCell
                    className={classNames(classes.editCell, classes.moneyColumn)}
                    align="right">
                    <MoneyField value={values.hst} onChange={handleChange} name={'hst'} label={'HST'}
                                className={classNames(classes.whiteBackground, classes.moneyColumn)}/>

                </TableCell>
            </TableRow>

            <TableRow className={classes.buttonRow}>
                <TableCell
                    className={classNames(classes.editCell, classes.dateColumn)}
                    align="left" />
                <TableCell align="left" />
                <TableCell align="left" />
                <TableCell
                    colSpan={2}
                    className={classNames(classes.editCell, classes.moneyColumn)}
                    align="right">
                    <Button
                        variant={'outlined'}
                        color={'primary'}
                        size={'small'}
                        onClick={stopEditingAndReset}>
                        Cancel
                    </Button>

                    <Button
                        className={classes.buttonRowButtons}
                        onClick={saveAndSubmit}
                        variant={'outlined'}
                        color={'primary'}
                        size={'small'}>
                        Save
                    </Button>
                </TableCell>
            </TableRow></React.Fragment>));
};

export default ExpensesEditRow;

