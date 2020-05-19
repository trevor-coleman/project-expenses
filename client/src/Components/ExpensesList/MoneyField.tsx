import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import CurrencyFormat from '../CurrencyFormat';

interface IRightAlignTextFieldProps {
    label: string;
    value: string;
    onChange: any;
    name: string;
    className: any;
}

type RightAlignTextFieldProps = IRightAlignTextFieldProps;

const useStyles = makeStyles((theme: Theme) => createStyles({
    input: {
        textAlign: 'right', '&.MuiFormHelperText-root': {
            textAlign: 'right',
        },
    },
}));

const MoneyField: FunctionComponent<IRightAlignTextFieldProps> = (props: RightAlignTextFieldProps) => {
    const classes = useStyles();

    return useObserver(() => {
        return (
            <div>
                <TextField
                    className={props.className}
                    label={props.label}
                    InputProps={{
                        classes, inputComponent: CurrencyFormat as any,
                    }}
                    value={props.value}
                    onChange={props.onChange}
                    name={props.name}
                    variant={'outlined'}
                    margin={'dense'}
                />
            </div>);
    });
};

export default MoneyField;