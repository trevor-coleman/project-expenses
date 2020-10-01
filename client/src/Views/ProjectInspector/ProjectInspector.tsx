import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { navigate, RouteComponentProps, Router } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import PageLayout from '../../Layout/PageLayout';
import store from '../../store';
import theme from '../../Theme/theme';
import Expenses from './Expenses';
import Summary from './Summary';

interface IProjectProps extends RouteComponentProps {
    projectId?: string;
}

type ProjectProps = IProjectProps;

const useStyles = makeStyles({
    projectTitle: {
        padding: theme.spacing(3),
    },
    projectInspector: {
        padding: theme.spacing(3),
    },
});

interface TabRouteProps extends PropsWithChildren<RouteComponentProps> {
    index: number;
    projectId: string | undefined;
}

const ProjectInspector: FunctionComponent<IProjectProps> = (props: ProjectProps) => {
    const classes = useStyles();
    const {projectId} = props;
    const {project} = store.data;
    const [value, setValue] = React.useState(0);
    const state = store.ui.projectInspector;

    if (projectId && store.data.project._id.toString() !== projectId) {
        store.data.setProject(projectId);
    }
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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

    return useObserver(() => {
        return (
            <PageLayout
                title={project.name}
                backLabel="Back"
                backTo="/project"
                noSpace>
                <AppBar
                    color={'transparent'}
                    position={'static'}>
                    <Tabs
                        onChange={handleChange}
                        value={value}>
                        <Tab label={'Summary'} />
                        <Tab label={'Expenses'} />
                        <Tab label={'Orders'} />
                    </Tabs>
                </AppBar>

                <Router primary={false}>
                    <Summary path={'/'} />
                    <Expenses path={'expenses'} />
                </Router>
            </PageLayout>);
    });
};

export default ProjectInspector;


