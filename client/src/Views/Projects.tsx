import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { RouteComponentProps } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import ProjectList from '../Components/ProjectList/ProjectList';
import SectionHeader from '../Components/SectionHeader';
import PageLayout from '../Layout/PageLayout';
import theme from '../Theme/theme';

interface IProjectsProps extends RouteComponentProps {}

type ProjectsProps = IProjectsProps;

const useStyles = makeStyles({
    projectTitle: {
        padding: theme.spacing(3),
    },
});

const Projects: FunctionComponent<IProjectsProps> = (props: ProjectsProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <PageLayout
            title="Projects"
            backLabel="back"
            backTo="/">


            <Grid
                container
                justify="space-between">
                <Grid item>
                    <SectionHeader>Active Projects</SectionHeader>
                </Grid>
                <Grid item>
                    <Button
                        variant={'outlined'}
                        size={'small'}
                        color={'primary'}
                        startIcon={<AddIcon />}
                        onClick={() => {}}
                    > Add New Project</Button>
                </Grid>
            </Grid>

            <ProjectList />
        </PageLayout>));
};

export default Projects;