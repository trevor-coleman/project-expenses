import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from '@reach/router';
import { useObserver } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import Home from '../Views/Home';

interface IHomeProps extends RouteComponentProps {}

type HomeProps = IHomeProps;

const useStyles = makeStyles({
    HomeRoute: {
        flexGrow: 1,
    },
});

const HomeRoute: FunctionComponent<IHomeProps> = (props: HomeProps) => {
    const classes = useStyles();

    return useObserver(() => (
        <div className={classes.HomeRoute}>
            <Home />
        </div>));
};

export default HomeRoute;