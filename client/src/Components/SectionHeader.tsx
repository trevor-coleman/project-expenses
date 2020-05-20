import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import theme from '../Theme/theme';

interface ISectionHeaderProps {subHead?: boolean;}

type SectionHeaderProps = ISectionHeaderProps;

const useStyles = makeStyles({
    sectionHeader: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(2),
    },
    headerText: {
        color: theme.palette.primary.dark,
    },

});

const SectionHeader: FunctionComponent<ISectionHeaderProps> = (props: PropsWithChildren<SectionHeaderProps>) => {
    const classes = useStyles();
    const {children, subHead} = props;

    return useObserver(() => {
        return (
            <div className={classes.sectionHeader}>
                <Typography
                    className={classes.headerText}
                    variant={subHead
                             ? 'h6'
                             : 'h5'}>
                    {children}
                </Typography>

            </div>);
    });
};

export default SectionHeader;