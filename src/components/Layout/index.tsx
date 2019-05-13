import { createStyles, CssBaseline, WithStyles } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as React from 'react';
import { Navbar } from '../';
import {Footer} from '../Footer';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,

        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth + 24 - 8,
    },
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    children: React.ReactNode;
    logout: () => void;
    loggedIn: boolean;
}

class LayoutComponent extends React.Component<Props, object> {
    public state = {
        open: false,
    };

    public render() {
        const {
            classes,
            children,
            loggedIn,
        } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Navbar
                    loggedIn={loggedIn}
                    logout={this.handleLogout}
                    open={this.state.open}
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleDrawerClose={this.handleDrawerClose}
                />
                <main className={classNames(classes.content, {[classes.contentShift]: this.state.open})}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
                <Footer/>
            </div>
        );
    }

    private handleLogout = () => {
        this.props.logout();
    };
    private handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    private handleDrawerClose = () => {
        this.setState({ open: false });
    };
}

export const Layout = withStyles(styles, { withTheme: true })(LayoutComponent);
