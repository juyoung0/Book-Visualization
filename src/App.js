import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyReactComponent from './MyReactComponent';

const App = () => (
    <MuiThemeProvider>
        <MyReactComponent />
    </MuiThemeProvider>
);


export default App;
