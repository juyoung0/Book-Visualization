/**
 * Created by juyoung on 2018-04-06.
 * Input page for chracter
 */
import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {Actions} from './actions';
import {menuStore} from './stores'
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

const paperStyle = {
    height: '85%',
    width: "85%",
    margin: '7%',
    textAlign: 'center',
    display: 'inline-block',
};

class CPaper extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            name: '',
            annotation: ''
        };

        menuStore.onChange = () => {
            if(menuStore.menu=="add-character")
                this.setState({open: true});
        }
    }

    handleChange = e =>
    {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({open: false});
      //  Actions.changeMenu(null);
    }

    handleSubmit = () => {
        this.setState({open: false});
        Actions.addNode(this.state.name);
      //  Actions.changeMenu(null);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSubmit}
            />,
        ];
        return (

            <Dialog
                title="Dialog With Actions"
                actions={actions}
                id='character_dialog'
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <Paper zDepth={2}>
                <Slider defaultValue={0.5} />
                <TextField id="name" hintText="Name" style={paperStyle} underlineShow={false} onChange={ this.handleChange.bind(this) } value={this.state.name}/>
                <Divider />
                <TextField id="annotation" hintText="Annotation" style={paperStyle} underlineShow={false} onChange={ this.handleChange.bind(this) } value={this.state.annotation}/>
                <Divider />
                </Paper>
            </Dialog>
        );
    }

}

export default CPaper;