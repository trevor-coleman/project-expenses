import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { navigate } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import PageLayout from '../Layout/PageLayout';
import theme from '../Theme/theme';

interface IHomeProps {}

type HomeProps = IHomeProps;

const useStyles = makeStyles({
    pageTitle: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    phantomButton: {
        height: 52,
    },
    topBox: {
        height: '100%',
        padding: theme.spacing(3),
    },
});

const Home: FunctionComponent<IHomeProps> = (props: HomeProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <PageLayout
            title="Home"
            backLabel="Sign Out">
            <List>
                <ListItem
                    onClick={() => navigate('/project')}
                    button
                >
                    <Typography variant={'h4'}>
                        Projects
                    </Typography>
                </ListItem>
            </List>

        </PageLayout>));
};

export default Home;