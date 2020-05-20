import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { navigate } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import theme from '../Theme/theme';

interface IBackButtonProps {
    to?: string;
    label?: string;
    navFunction?: () => void;
}

type BackButtonProps = IBackButtonProps;

const useStyles = makeStyles({
    BackButton: {margin: theme.spacing(1)},
});

const BackButton: FunctionComponent<IBackButtonProps> = (props: BackButtonProps) => {
    const {to, navFunction, label = 'back'} = props;
    const classes = useStyles();
    const handleClick = () => {
        if (to) {
            navigate(to);
        } else if (navFunction) {
            navFunction();
        }
    };

    return useObserver(() => (
        <div className={classes.BackButton}><Button onClick={handleClick}><ChevronLeftIcon />{label}</Button></div>));
};

export default BackButton;