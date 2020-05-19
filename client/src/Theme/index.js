// src/ui/theme/index.js

import {createMuiTheme} from '@material-ui/core/styles';
import themeJSON from './theme.json'

const palette = {
    primary: {main: '#FFF3E0'},
    secondary: {main: '#edf0f2', contrastText: '#000000'}
}

const serif = "'Merriweather', serif";
const sansSerif = "'Open Sans', 'Helvetica', 'Arial', sans-serif";

const typography = {
    headline: {
        color: "rgba(0, 0, 0, 0.87)",
        "fontFamily": serif,
        "lineHeight": "1.35417em",
        "fontSize": "1.5rem",
        "fontWeight": 700
    },
    "display2": {
        "marginLeft": "-.02em",
        "color": "rgba(0, 0, 0, 0.54)",
        "fontFamily": serif,
        "lineHeight": "1.13333em",
        "fontSize": "2.8125rem",
        "fontWeight": 400
    },
    "fontWeightLight": 300,
    "display3": {
        "marginLeft": "-.02em",
        "color": "rgba(0, 0, 0, 0.54)",
        "fontFamily": serif,
        "letterSpacing": "-.02em",
        "lineHeight": "1.30357em",
        "fontSize": "3.5rem",
        "fontWeight": 400
    },
    "display4": {
        "marginLeft": "-.04em",
        "color": "rgba(0, 0, 0, 0.54)",
        "fontFamily": serif,
        "letterSpacing": "-.04em",
        "lineHeight": "1.14286em",
        "fontSize": "7rem",
        "fontWeight": 300
    },
    "fontWeightRegular": 400,
    "display1": {
        "color": "rgba(0, 0, 0, 0.54)",
        "fontFamily": serif,
        "lineHeight": "1.20588em",
        "fontSize": "2.125rem",
        "fontWeight": 400
    },
    "button": {
        "textTransform": "uppercase",
        "color": "rgba(0, 0, 0, 0.87)",
        "fontFamily": sansSerif,
        "fontSize": "0.875rem",
        "fontWeight": 500
    },
    "fontFamily": "'Merriweather', 'Helvetica', 'Arial', sans-serif",
    "body2": {
        "color": "rgba(0, 0, 0, 0.87)",
        "fontFamily": sansSerif,
        "lineHeight": "1.71429em",
        "fontSize": "0.875rem",
        "fontWeight": 500
    },
    "caption": {
        "color": "rgba(0, 0, 0, 0.54)",
        "fontFamily": sansSerif,
        "lineHeight": "1.375em",
        "fontSize": "0.75rem",
        "fontWeight": 400
    },
    "fontSize": 14,
    "fontWeightMedium": 500,
    "title": {
        "color": "rgba(0, 0, 0, 0.87)",
        "fontFamily": sansSerif,
        "lineHeight": "1.16667em",
        "fontSize": "1.3125rem",
        "fontWeight": 700
    },
    "h6": {
        "color": "rgba(0, 0, 0, 0.87)",
        "fontFamily": serif,
        "lineHeight": "1.16667em",
        "fontSize": "1.3125rem",
        "fontWeight": 900
    },
    "subheading": {
        "color": "rgba(0, 0, 0, 0.87)",
        "fontFamily": sansSerif,
        "lineHeight": "1.5em",
        "fontSize": "1rem",
        "fontWeight": 400
    },
    "body1": {
        "color": "rgba(0, 0, 0, 0.87)",
        "fontFamily": sansSerif,
        "lineHeight": "1.46429em",
        "fontSize": "0.875rem",
        "fontWeight": 400
    }
}

const overrides = {
    MuiButton: {
        textPrimary: {
            color: "#6d4c41",
            border: "1px solid",
            borderColor: "#6d4c41"
        },
        primary: {
            color: "#6d4c41",
            border: "1px solid",
            borderColor: "#6d4c41"
        },
        secondary: {
            color: "#6d4c41",
            border: "1px solid",
            borderColor: "#6d4c41"
        }
    },

}

const themeName = 'Sazerac Porcelain Caracal';
let theme = createMuiTheme({palette: themeJSON.palette, typography, overrides, themeName}, {testStyle: {color: 'red'}});
export default theme;