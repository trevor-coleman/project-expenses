import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Dinero } from 'dinero.js';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import MyDinero from '../classes/MyDinero';
import theme from '../Theme';

interface ISummaryTableProps {}

type SummaryTableProps = ISummaryTableProps;

const useStyles = makeStyles({
    SummaryTable: {
        border: 'solid 1px',
    },
    paper: {
        padding: theme.spacing(3),
    },
    summaryPaper: {
        flexGrow: 1,
    },
    summaryGrid: {
        flexGrow: 1,
        width: '100%',
    },
    boldText: {
        fontWeight: 900,
        color: '#000',
    },
    tableCell: {
        padding: theme.spacing(1),
        borderBottom: 'none',
    },
    tableFooter: {
        borderTop: 'double',
    },
});

interface ICalculationTableProps {
    info: ICalculationTableInfo
}

interface ICalculationTableInfo {
    title: string;
    description: string;
    firstTerm: {
        label: string; amount: Dinero;
    }
    secondTerm: {
        label: string; amount?: Dinero; type: 'percent' | 'normal'; percentAmount?: number;
    }
    total: {
        label: string; amount: Dinero;
    }
}

const CalculationTable = (props: ICalculationTableProps) => {
    const classes = useStyles();
    const {title, firstTerm, secondTerm, total, description} = props.info;
    const secondTermString: string = secondTerm.type === 'normal'
                                     ? secondTerm!.amount!
                                         .toFormat('$0.00')
                                     : Math
                                           .round(secondTerm!.percentAmount! * 100)
                                           .toString() + '%';

    return <Paper className={classes.paper}>
        <Typography variant={'h6'}>{title}</Typography>
        <Typography variant={'caption'}>{description}</Typography>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className={classes.tableCell}>{firstTerm.label}</TableCell>
                    <TableCell
                        className={classes.tableCell}
                        align='right'>{firstTerm.amount.toFormat('$0.00')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.tableCell}>{secondTerm.label}</TableCell>
                    <TableCell
                        className={classes.tableCell}
                        align='right'>{secondTermString}</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter className={classes.tableFooter}>
                <TableRow>
                    <TableCell className={classes.tableCell}>
                        <Typography
                            className={classes.boldText}
                            variant='subtitle1'>
                            {total.label}
                        </Typography>
                    </TableCell>
                    <TableCell
                        className={classes.tableCell}
                        align='right'>
                        <Typography
                            className={classes.boldText}
                            variant='subtitle1'>
                            {total.amount.toFormat('$0.00')}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Paper>;
};

const SummaryTable: FunctionComponent<ISummaryTableProps> = (props: SummaryTableProps) => {
    const classes = useStyles();

    const revenueInfo: ICalculationTableInfo = {
        title: 'Revenue',
        description: 'Total collected, not including sales tax',
        firstTerm: {
            amount: MyDinero({amount: 11300}),
            label: 'Total Collected',
        },
        secondTerm: {
            amount: MyDinero({amount: 1300}),
            label: 'HST Collected',
            type: 'normal',
        },
        total: {
            amount: MyDinero({amount: 10000}),
            label: 'Total Revenue',
        },

    };

    const profitInfo: ICalculationTableInfo = {
        title: 'Profit',
        description: 'Total after expenses and sales tax',
        firstTerm: {
            amount: MyDinero({amount: 10000}),
            label: 'Total Revenue',
        },
        secondTerm: {
            amount: MyDinero({amount: 2500}),
            label: 'Total Expenses',
            type: 'normal',
        },
        total: {
            amount: MyDinero({amount: 7500}),
            label: 'Total Profit',
        },

    };

    const salesTaxInfo: ICalculationTableInfo = {
        firstTerm: {
            amount: MyDinero({amount: 1300}),
            label: 'HST Collected',
        },
        secondTerm: {
            amount: MyDinero({amount: 650}),
            label: 'HST Paid on Expenses',
            type: 'normal',
        },
        total: {
            amount: MyDinero({amount: 650}),
            label: 'HST Remittance',
        },
        title: 'Sales Tax',
        description: 'Amount to set aside for sales tax',
    };

    const incomeTaxInfo: ICalculationTableInfo = {
        firstTerm: {
            amount: MyDinero({amount: 7500}),
            label: 'Gross Profit',
        },
        secondTerm: {
            percentAmount: 0.2,
            label: 'Income Tax Percent',
            type: 'percent',
        },
        total: {
            amount: MyDinero({amount: 1500}),
            label: 'Income tax withholding',
        },
        title: 'Income Tax',
        description: 'Amount to set aside for sales tax',
    };

    return useObserver(() => (
        <Box>
            <Grid
                container
                direction='row'
                xs
                spacing={3}>
                <Grid
                    item
                    xs>
                    <Grid
                        container
                        direction={'column'}>
                        <Grid xs><CalculationTable info={revenueInfo} /></Grid>
                        <Grid
                            xs
                            className={classes.summaryGrid}>
                            <CalculationTable info={profitInfo} /></Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs>
                    <Grid
                        container
                        direction={'column'}>
                        <Grid xs><CalculationTable info={salesTaxInfo} /></Grid>
                        <Grid xs><CalculationTable info={incomeTaxInfo} /></Grid>
                    </Grid></Grid>
            </Grid>
        </Box>));
};

export default SummaryTable;