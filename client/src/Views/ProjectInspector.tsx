import { Box, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import ExpensesList from '../Components/ExpensesList';
import store from '../store';

interface IProjectProps {
}

type ProjectProps = IProjectProps;

const useStyles = makeStyles({
    Project: {},
    ProjectName: {
        paddingBottom: 10,
    },
    topPaper: {},
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ProjectInspector: FunctionComponent<IProjectProps> = (props: ProjectProps) => {
    const classes = useStyles();
    const {project} = store.data;
    const [value, setValue] = React.useState(0);
    const {projectLoaded} = store.ui.projectInspector;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return useObserver(() => {

        return (
            <div className={classes.Project}>
                <Paper>
                    <AppBar color={'transparent'} position={"static"}>
                        <Tabs onChange={handleChange} value={value}>
                            <Tab disabled={projectLoaded} label={"Summary"}/>
                            <Tab label={"Expenses"}/>
                            <Tab label={"Orders"}/>
                        </Tabs>
                    </AppBar>
                    {project.name
                     ? (
                         <div>

                             <TabPanel value={value} index={0}>
                                 Summary
                             </TabPanel>
                             <TabPanel value={value} index={1}>
                                 <ExpensesList/>
                             </TabPanel>
                             <TabPanel value={value} index={2}>
                                 Orders
                             </TabPanel>
                         </div>)
                     : (
                         <div/>)}
                </Paper>


            </div>);
    });
};

export default ProjectInspector;