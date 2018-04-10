/**
 * Created by juyoung on 2018-04-03.
 */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {Actions} from './actions';
import MyGraph from './MyGraph';
import CPaper from './InputPage';
import RPaper from './InputPage2';
import {menuStore, nodeStore, linkStore, sourceStore, targetStore} from './stores'
import ListItems from './MyList';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


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
        };

        menuStore.onChange = () => {
            this.setState({clicked: menuStore.menu});
        }
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClick = event => {
        Actions.changeMenu(event.currentTarget.id);
    //temporal code
        if(event.currentTarget.id == "add-relationship") {
            Actions.addLink(sourceStore.sNode, targetStore.tNode);
            Actions.addSource(null);
            Actions.addTarget(null);
        }

};
    handleClose = () => {
        this.setState({input: false});
    }
    render(){

        return(
            <div>
                <AppBar
                    title="Book Vis"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick = {this.handleToggle}
                />
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FloatingActionButton id="add-character" onClick={this.handleClick} mini={true} label="Add Character" style={styles.actionButton}>
                            <ContentAdd />
                        </FloatingActionButton>
                        <FloatingActionButton id="add-relationship" onClick={this.handleClick} mini={true} label="Add Relationship" style={styles.actionButton}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </ToolbarGroup>
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
                    <AppBar title="Drawing Tool"
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
    <MyGraph/>
<RPaper />

<CPaper />

    </div>
);


export default MyReactComponent;