import React from 'react';
import NumberFormat from 'react-number-format';

interface CurrencyFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export default function CurrencyFormat(props: CurrencyFormatCustomProps) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name, value: values.value,
                    },
                });
            }}
            fixedDecimalScale
            decimalScale={2}
            thousandSeparator
            isNumericString
            prefix="$"
        />);
}