import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { navigate } from '@reach/router';
import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import store from "../../store";
import { useObserver } from 'mobx-react';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

interface IExpensesTabNavProps{
    index: number;
    projectId: string|undefined;
}

type ExpensesTabNavProps = IExpensesTabNavProps;

const useStyles = makeStyles({
    ExpensesTabNav: {},
});

const ExpensesTabNav: FunctionComponent<IExpensesTabNavProps> = (props: PropsWithChildren<ExpensesTabNavProps>) => {
    const classes = useStyles();
    const {index,projectId, children} = props
    const [value, setValue] = useState(index);


    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(newValue);
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate(`/project/${projectId}`);
                return;
            case 1:
                navigate(`/project/${projectId}/expenses`);
                return;
            case 2:
                navigate(`/project/${projectId}/orders`);
                return;
        }
    };

    return useObserver(() => (
        <Box p={3}><AppBar color={'transparent'} position={"static"}>
            <Tabs onChange={handleChange} value={value}>
                <Tab label={"Summary"} value={0}/>
                <Tab label={"Expenses"}/>
                <Tab label={"Orders"}/>
            </Tabs>
        </AppBar>
            {children}</Box>));
};

export default ExpensesTabNav;