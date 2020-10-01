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
import store from '../store';
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
    title: string;
    firstTermLabel: string;
    firstTermAmount: Dinero;
    secondTermLabel: string;
    secondTermAmount?: Dinero;
    secondTermPercent?: boolean;
    secondTermPercentAmount?: number;
    totalLabel: string;
    totalAmount: Dinero;
}

const CalculationTable = (props: ICalculationTableProps) => {
    const classes = useStyles();
    const {title, firstTermLabel, firstTermAmount, secondTermLabel,secondTermAmount,secondTermPercent, secondTermPercentAmount,totalLabel,totalAmount} = props
    const secondTermString: string = secondTermPercent
                                     ? Math
                                           .round(secondTermPercentAmount! * 100)
                                           .toString() + '%'
                                     : secondTermAmount!
                                         .toFormat('$0.00')

    return <Paper className={classes.paper}>
        <Typography variant={'h6'}>{title}</Typography>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className={classes.tableCell}>{firstTermLabel}</TableCell>
                    <TableCell
                        className={classes.tableCell}
                        align='right'>{firstTermAmount.toFormat('$0.00')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.tableCell}>{secondTermLabel}</TableCell>
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
                            {totalLabel}
                        </Typography>
                    </TableCell>
                    <TableCell
                        className={classes.tableCell}
                        align='right'>
                        <Typography
                            className={classes.boldText}
                            variant='subtitle1'>
                            {totalAmount.toFormat('$0.00')}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Paper>;
};

const SummaryTable: FunctionComponent<ISummaryTableProps> = (props: SummaryTableProps) => {
    const classes = useStyles();
    return useObserver(() => {
        const {data} = store;

        return (
            <Box>
                <Grid
                    container
                    direction='row'
                    spacing={3}>
                    <Grid
                        item
                        xs>
                        <Grid
                            container
                            spacing={3}
                            direction={'column'}>
                            <Grid
                                item
                                xs><CalculationTable
                                    title='Income'
                                    firstTermAmount={data.totals.totalCollected}
                                    firstTermLabel={'Total Collected'}
                                    secondTermAmount={data.totals.totalHstCollected.multiply(-1)}
                                    secondTermLabel='HST'
                                    totalAmount={data.totals.totalRevenue}
                                    totalLabel='Total Income'
                            /></Grid>
                            <Grid
                                item
                                xs
                                className={classes.summaryGrid}>
                                <CalculationTable
                                    title='Profit'
                                    firstTermAmount={data.totals.totalCollected}
                                    firstTermLabel={'Total Revenue'}
                                    secondTermAmount={data.totals.expensesWithoutHst}
                                    secondTermLabel='Expenses (without HST)'
                                    totalAmount={data.totals.totalProfit}
                                    totalLabel='Total Profit'
                                /></Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs>
                        <Grid
                            container
                            direction={'column'}
                            spacing={3}
                        >
                            <Grid
                                item
                                xs><CalculationTable
                                title='HST Remittance'
                                firstTermAmount={data.totals.totalHstCollected}
                                firstTermLabel={'HST Collected'}
                                secondTermAmount={data.totals.totalHstPaid.multiply(-1)}
                                secondTermLabel='HST Paid (ITC)'
                                totalAmount={data.totals.hstRemittance}
                                totalLabel='HST Owed to Government'
                            /></Grid>
                            <Grid
                                item
                                xs><CalculationTable
                                title='Income Tax'
                                firstTermAmount={data.totals.totalProfit}
                                firstTermLabel={'Total Profit'}
                                secondTermPercentAmount={data.project.incomeTaxRate ? data.project.incomeTaxRate : 0.0}
                                secondTermLabel='Income Tax Rate'
                                secondTermPercent
                                totalAmount={data.totals.incomeTax}
                                totalLabel='Amount to Set Aside'
                            /></Grid>
                        </Grid></Grid>
                </Grid>
            </Box>);
    });
};

export default SummaryTable;