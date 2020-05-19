import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useObserver } from 'mobx-react';
import moment from 'moment';
import React, { FunctionComponent, useState } from 'react';
import store from "../../store";
import { componentStyles } from './componentStyles';

interface IExpenseEditRowProps {}

type ExpensesEditRowProps = IExpenseEditRowProps;

const useStyles = makeStyles({
    ExpenseEditRow: {}, ...componentStyles,
});

const ExpensesEditRow: FunctionComponent<ExpensesEditRowProps> = (props: ExpensesEditRowProps) => {
    const {dateColumn, descriptionColumn, moneyColumn, vendorColumn} = useStyles();
    const theme = useTheme();
    const [date, setDate] = useState(moment(new Date()) as MaterialUiPickersDate);
    const [description, setDescription] = useState("");
    const [vendor, setVendor] = useState("");

    const stopEditingAndReset = (): void => {
        store.ui.setExpenseListEditing(false);
    };

    return useObserver(() => (
        <React.Fragment>

            <TableRow>
                <TableCell className={dateColumn} align="left"><DatePicker value={date} onChange={setDate}/></TableCell>
                <TableCell className={descriptionColumn} align="left"><TextField/></TableCell>
                <TableCell className={vendorColumn} align="left"><TextField/></TableCell>
                <TableCell className={moneyColumn} align="right"><TextField/></TableCell>
                <TableCell className={moneyColumn} align="right"><TextField/></TableCell>
            </TableRow>

            <TableRow>
                <TableCell className={dateColumn} align="left"/>
                <TableCell align="left"/>
                <TableCell align="left"/>
                <TableCell className={moneyColumn} align="right">
                    <Button variant={"outlined"}
                            color={'secondary'}
                            size={'small'} onClick={stopEditingAndReset}>
                        Cancel
                    </Button>
                </TableCell>
                <TableCell
                    className={moneyColumn}
                    align="right">
                    <Button
                        variant={"contained"}
                        color={'primary'}
                        size={'small'}>
                        Save
                    </Button>
                </TableCell>
            </TableRow></React.Fragment>));
};

export default ExpensesEditRow;