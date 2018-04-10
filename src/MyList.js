import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Menu, {MenuItem, MenuList} from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';


const paperStyle = {
    height: '85%',
    width: "85%",
    margin: '7%',
    textAlign: 'center',
    display: 'inline-block',
};

var clickedPaper = null;
var clickedMenu = null;

const paper1 = (
    <Paper zDepth={2}>
    <Slider defaultValue={0.5} />
    <TextField hintText="First name" style={paperStyle} underlineShow={false} />
    <Divider />
    <TextField hintText="Middle name" style={paperStyle} underlineShow={false} />
    <Divider />
    <TextField hintText="Last name" style={paperStyle} underlineShow={false} />
    <Divider />
    <TextField hintText="Email address" style={paperStyle} underlineShow={false} />
    <Divider />
    </Paper>
);

const paper2 = (
    <Paper zDepth={2}>
    <TextField hintText="name" style={paperStyle} underlineShow={false} />
    <Divider />
    <TextField hintText="name" style={paperStyle} underlineShow={false} />
    <Divider />
    <TextField hintText="name" style={paperStyle} underlineShow={false} />
    <Divider />
    <TextField hintText="address" style={paperStyle} underlineShow={false} />
    <Divider />
    </Paper>
);

const paper3 = (
    <Paper zDepth={2}>
        <TextField hintText="Annotation" style={paperStyle} underlineShow={false} />
    </Paper>
);


class ListItems extends React.Component {
    state = {
        open: false,
    };

    handleClick = event => {
        clickedMenu = event.currentTarget.id;
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({ anchorEl : null });
        this.setState({open: false});
    }
    render()
    {
        const { anchorEl } = this.state;

        return(
            <div>
                <Menu id="main-menu">
                    < MenuItem id="character" onClick={this.handleClick}> Character < / MenuItem >
                    < MenuItem id="relationship" onClick={this.handleClick}> Relationship < / MenuItem >
                    < MenuItem id="add-annotation" onClick={this.handleClick}> Add Annotation < / MenuItem >
                    < MenuItem id="make-group" onClick={this.handleClick}> Make Group < / MenuItem >
                </Menu>
            </div>
        );
    }
};

export default ListItems;