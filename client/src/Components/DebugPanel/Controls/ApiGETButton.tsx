import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios, { AxiosResponse } from 'axios';
import React from 'react';

interface IApiButtonProps {
    path: string;
    handleResponse: (response:AxiosResponse)=>void;
}

const useStyles = makeStyles({
    apiButton: {
        textTransform: 'lowercase',
        fontWeight: 'bold'
    }
})

export const ApiGETButton = (props: IApiButtonProps) => {
    const classes = useStyles();
    const {path, handleResponse} = props;
    const waitAndLogResponse = () => {
        axios
            .get(path)
            .then((response)=>handleResponse(response))
    };
    return <Button
        className={classes.apiButton}
        size='large'
        variant='outlined'
        color='primary'
        onClick={waitAndLogResponse}
    >
        {path}
    </Button>;
};
