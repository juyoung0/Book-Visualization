/**
 * Created by juyoung on 2018-04-06.
 * Input page for chracter
 */
import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {Actions} from './actions';
import {menuStore, sourceStore, dataStore, selectedNodeStore, selectedLinkStore} from './stores'
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import Mood from 'material-ui/svg-icons/social/mood';
import MoodBad from 'material-ui/svg-icons/social/mood-bad';
import SearchRadiusInput from './MySlider';


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
            emotion: 0,
            annotation: ''
        };

        menuStore.onChange = () => {
            if(menuStore.menu=="add-info")
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
        this.setState({emotion:0});
      //  Actions.changeMenu(null);
    }

    handleSubmit = () => {
        var data = dataStore.data;
        //sourceStore.sNode should be changed later (save in state)
        if(selectedNodeStore.focus){
            var ind = data.nodes.findIndex(n => n.id == selectedNodeStore.node);
            data.nodes[ind].emo.push(this.state.emotion);
            data.nodes[ind].anno.push(this.state.annotation);
        }else if(selectedLinkStore.focus){
            var ind = data.links.findIndex(n => n.source == selectedLinkStore.sNode && n.target == selectedLinkStore.tNode );
            data.links[ind].emo.push(this.state.emotion);
            data.links[ind].anno.push(this.state.annotation);
        }

        Actions.changeData(data);
        this.setState({open: false});
        this.setState({emotion:0});
      //  Actions.changeMenu(null);
    }

    handleSlide = (event, emotion) => this.setState({ emotion });
    handleSlideStop = () => this.props.update(this.state.emotion);

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

        var title = "";
        if(selectedNodeStore.focus)
            title = "Information of " + selectedNodeStore.node;
        else if(selectedLinkStore.focus)
            title = "Relationship between " + selectedLinkStore.sNode + " & " + selectedLinkStore.tNode;

        return (

            <Dialog
                title={title}
                actions={actions}
                id='character_dialog'
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <Paper zDepth={2}>
                <h2>Emotion</h2>

                <div class="row">
                        <div className="columnIcon"><MoodBad /></div>
                        <div className="columnSlider"><SearchRadiusInput radius={this.state.emotion} onChange={this.handleSlide} onDragStop={this.handleSlideStop}/></div>
                        <div className="columnIcon"><Mood /></div>
                </div>
                <Divider />
                <h2>Annotation</h2>
                <TextField id="annotation" hintText="Annotation" style={paperStyle} underlineShow={false} onChange={ this.handleChange.bind(this) } value={this.state.annotation}/>
                <Divider />
                </Paper>
            </Dialog>
        );
    }

}

export default CPaper;