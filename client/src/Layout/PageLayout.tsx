import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import BackButton from '../Components/BackButton';
import theme from '../Theme/theme';

interface IPageLayoutProps {
    title: string;
    backLabel: string;
    backTo?: string;
    onClickBack?: () => void;
    noSpace?: boolean;
}

type PageLayoutProps = IPageLayoutProps;

const useStyles = makeStyles({
    pageTitle: {
        padding: theme.spacing(3),
    },
    topBox: {
        minHeight: 600,
        padding: theme.spacing(3),
    },
    bottomSpace: {
        marginBottom: theme.spacing(0),
    },
});

const PageLayout: FunctionComponent<IPageLayoutProps> = (props: PropsWithChildren<PageLayoutProps>) => {
    const classes = useStyles();
    const {noSpace} = props;

    return useObserver(() => (
        <div>
            <BackButton
                to={props.backTo}
                label={props.backLabel}
                navFunction={props.onClickBack}
            />
            <Paper className={classes.topBox}>
                <AppBar
                    className={classNames(
                        classes.pageTitle,
                        !noSpace
                        ? classes.bottomSpace
                        : null)}
                    color={'primary'}
                    position={'static'}
                >
                    <Typography
                        variant={'h4'}
                    >
                        {props.title}
                    </Typography>
                </AppBar>
                <Box
                    p={noSpace
                       ? 0
                       : 4}>{props.children}</Box>
            </Paper></div>));
};

export default PageLayout;