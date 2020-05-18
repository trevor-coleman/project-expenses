import { Box, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import ExpensesList from '../../Components/ExpensesList/ExpensesList';

interface IProjectProps {
    project: any;
}

type ProjectProps = IProjectProps;

const useStyles = makeStyles({
    Project: {},
    ProjectName: {
        paddingBottom: 10,
    },
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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ProjectInspector: FunctionComponent<IProjectProps> = (props: ProjectProps) => {
    const classes = useStyles();
    const {project} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return useObserver(() => (
        <div className={classes.Project}>
            <div className={classes.ProjectName}>
                <Typography variant={"h4"}>{
                    project
                    ? project.name
                    : "No project"
                }</Typography>
                <Typography variant={"caption"}>{project._id}</Typography></div>
            {project.name
             ? (
                 <div>
                     <AppBar position={"static"}>
                         <Tabs onChange={handleChange} value={value}>
                             <Tab label={"Summary"}/>
                             <Tab label={"Expenses"}/>
                             <Tab label={"Orders"}/>
                         </Tabs>
                     </AppBar>
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
             : (<div/>)}

        </div>
    ));
};

export default ProjectInspector;