/**
 * Created by juyoung on 2018-04-03.
 */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {Actions} from './actions';
import MyGraph from './MyGraph';
import MyBook from './MyBook';
import CPaper from './InputPage';
import RPaper from './InputPage2';
import ListItems from './MyList';
import {menuStore, nodeStore, linkStore, sourceStore, targetStore, textStore, dataStore} from './stores'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NodeAdd from 'material-ui/svg-icons/action/face';
import LinkAdd from 'material-ui/svg-icons/action/supervisor-account';
import SpeechAdd from 'material-ui/svg-icons/action/speaker-notes';
import InfoAdd from 'material-ui/svg-icons/editor/mode-edit';

var clickedPaper = null;
var clickedMenu = null;

const styles = {
    block: {
        maxWidth: 250,
    },
    toggle: {
        marginLeft: 15,
        width: 10,
    },
    thumbOff: {
        backgroundColor: '#ffcccc',
    },
    trackOff: {
        backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
        backgroundColor: 'red',
    },
    trackSwitched: {
        backgroundColor: '#ff9d9d',
    },
    labelStyle: {
        color: 'red',

    },
    actionButton : {
        marginRight: 20,
    },
    paperStyle :{
        height: '85%',
        width: "85%",
        margin: '7%',
        textAlign: 'center',
        display: 'inline-block',
    }
};


class MyAppBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            "open": false,
            "clicked":null,
            "input": false,
            "speechOpen":false,
            "data":  {
                nodes: [],
                links: []
            },
            "text": ""
        };

        menuStore.onChange = () => {
            this.setState({clicked: menuStore.menu});
        }
        dataStore.onChange = () => {
            this.setState({data: dataStore.data});
        }
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClick = event => {
        Actions.changeMenu(event.currentTarget.id);
        /*get Dragged text*/
        var text = null;

    //temporal code
        if(event.currentTarget.id == "add-relationship") {
            Actions.addLink(sourceStore.sNode, targetStore.tNode);
            Actions.addSource(null);
            Actions.addTarget(null);

        }else if(event.currentTarget.id == "add-node"){
            //Actions.selectText(text);
            if(window.getSelection().anchorNode){
                var selection = window.getSelection();
                text = selection.anchorNode.data;
                text = text.substring( selection.anchorOffset,selection.focusOffset);
            }
            if(text)
                Actions.addNode(text);
        }else if(event.currentTarget.id == "add-speech"){
            if(window.getSelection().anchorNode){
                var selection = window.getSelection();
                text = selection.anchorNode.data;
                text = text.substring( selection.anchorOffset,selection.focusOffset);
            }
            if(text){
               // document.getElementById("dragged_text").innerHTML = text;
                if(this.state.speechOpen == false)
                    this.setState({ speechOpen : true, anchorEl : event.currentTarget});
                else
                    this.setState({speechOpen : false});
                this.setState({text : text});
            }

          //  Actions.selectText(text);
        }else if(event.currentTarget.id == "add-info"){

        }
    };

    handleClose = () => {
        this.setState({input: false});
    };
    handleRequestClose = () => {
        this.setState({speechOpen : false});
    };

    handleSpeech = event => {
        var data = this.state.data;
        var ind = data.nodes.findIndex(n => n.id == event.currentTarget.id);
        data.nodes[ind].speech.push(this.state.text);
        this.setState({speechOpen : false});
    }

    dragStart = (event) => {
        // The dataTransfer.setData() method sets the data type and the value of the dragged data
        event.dataTransfer.setData("Text", event.target.id);

        // Output some text when starting to drag the p element
        document.getElementById("demo").innerHTML = "Started to drag the p element.";

        // Change the opacity of the draggable element
        event.target.style.opacity = "0.4";
    };
    drag = (event) => {
        document.getElementById("demo").style.color = "red";
    };
    dragEnd = (event) => {
        document.getElementById("demo").innerHTML = "Finished dragging the p element.";
        event.target.style.opacity = "1";
    };
    dragEnter = (event) => {
        if ( event.target.className == "droptarget" ) {
            event.target.style.border = "3px dotted red";
        }
    };
    dragOver = (event) => {
        event.preventDefault();
    };
    dragLeave = (event) => {
        if ( event.target.className == "droptarget" ) {
            event.target.style.border = "";
        }
    }
    drop = (event) => {
        event.preventDefault();
        if ( event.target.className == "droptarget" ) {
            document.getElementById("demo").style.color = "";
            event.target.style.border = "";
            var data = event.dataTransfer.getData("Text");
            event.target.appendChild(document.getElementById(data));
            document.getElementById("droptarget").innerHTML = data;
        }
    }
//<p draggable="true" id="dragged_text" onDragStart={this.dragStart} onDrag={this.drag} onDragEnter={this.dragEnter} onDragEnd={this.dragEnd} onDragLeave={this.dragLeave}>text</p>
//<p  id="demo"></p>
//    <p id="droptarget" onDrop={this.drop} onDragOver={this.dragOver} className="droptarget"></p>
    render(){

        return(
            <div className="app-bar">
                <AppBar
                    title="Book Vis"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick = {this.handleToggle}
                />
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FloatingActionButton id="add-node" onClick={this.handleClick} mini={true} label="Add Text" style={styles.actionButton}>
                            <NodeAdd />
                        </FloatingActionButton>
                        <FloatingActionButton id="add-relationship" onClick={this.handleClick} mini={true} label="Add Relationship" style={styles.actionButton}>
                            <LinkAdd />
                        </FloatingActionButton>
                        <div>
                        <FloatingActionButton id="add-speech" onClick={this.handleClick} mini={true} label="Add Speech" style={styles.actionButton}>
                            <SpeechAdd />
                        </FloatingActionButton>
                        <FloatingActionButton id="add-info" onClick={this.handleClick} mini={true} label="Add Information" style={styles.actionButton}>
                            <InfoAdd />
                        </FloatingActionButton>
                        <Popover
                            open={this.state.speechOpen}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                {this.state.data.nodes.map((node) => {return (<MenuItem onClick={this.handleSpeech} id={node.id} primaryText={node.id}/>);})}
                            </Menu>
                        </Popover>

                        </div>
                    </ToolbarGroup>

                    <p id="link_info"></p>

                    <ToolbarGroup>
                        <Toggle
                            label="a"
                            defaultToggled={true}
                            style={styles.toggle}
                        />
                        <Toggle
                            label="b"
                            defaultToggled={true}
                            style={styles.toggle}
                        />
                        <RaisedButton label="PLAY STORY" primary={true} />
                    </ToolbarGroup>
                </Toolbar>

                <Drawer width={300} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    <AppBar title="Informations"
                        onLeftIconButtonClick = {this.handleToggle}/>
                    <ListItems/>
                </Drawer>
            </div>

        );
    }
}


const MyReactComponent = () => (
    <div>
    <MyAppBar />
    <div className = 'content'>
        <div className='book'><MyBook/></div>
        <div className='vl'><MyGraph/></div>
    </div>
    <RPaper />
    <CPaper />

    </div>
);


export default MyReactComponent;