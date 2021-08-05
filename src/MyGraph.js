/**
 * Created by juyoung on 2018-04-05.
 */
import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import {nodeStore, sourceStore, targetStore, linkStore, dataStore, selectedNodeStore, selectedLinkStore, removeNodeStore} from './stores'
import {Actions} from './actions';


// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: '나', speech:[], emo:[], anno:[] }],
    links: []
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    width : 1000,
    height : 1000,
    node: {
        color: 'lightgreen',
        size: 1000,
        highlightStrokeColor: 'blue',
        fontSize: '13px',
        fontWeight: 'bold'
    },
    link: {
        highlightColor: 'lightblue'
    },
};

class myGraph extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            config : myConfig,
            data:  {
                nodes: [],
                links: []
            },
            node : null,
            sNode : null,
            tNode : null,
        };

        nodeStore.onChange=()=>{
            data.nodes.push({id:nodeStore.node, speech:[], emo:[], anno:[] })
            this.setState({data: data})
            console.log(JSON.stringify(data));

         //   Actions.changeData(data);
        }
        sourceStore.onChange=()=>{
            this.setState({sNode: sourceStore.sNode})
            if(sourceStore.sNode != null)
                document.getElementById("link_info").innerHTML = "From " + sourceStore.sNode;
            else
                document.getElementById("link_info").innerHTML = "" ;
        }
        targetStore.onChange=()=>{
            this.setState({tNode: targetStore.tNode})
            if(sourceStore.sNode == null && targetStore.tNode == null)
                document.getElementById("link_info").innerHTML = "" ;
            else
                document.getElementById("link_info").innerHTML = "From " + sourceStore.sNode + " to " + targetStore.tNode ;
        }
        linkStore.onChange=()=>{
            data.links.push({source:linkStore.sNode, target:linkStore.tNode, emo:[], anno:[]})
            this.setState({data: data})
            document.getElementById("link_info").innerHTML = "";
          //  Actions.changeData(data);
            console.log(JSON.stringify(data));
        }
        selectedNodeStore.onChange=()=>{
            document.getElementById("select_info").innerHTML = selectedNodeStore.node + " is selected";
        }
        selectedLinkStore.onChange=()=>{
            document.getElementById("select_info").innerHTML = selectedLinkStore.sNode + " - " + selectedLinkStore.tNode + " is selected";
        }
        removeNodeStore.onChange=()=>{
            /*remove link*/
            var inds = this.getSourceIndexes(data.links, removeNodeStore.node);
            inds.reverse()
            inds.map(function(i){ data.links.splice(i, 1) })
            inds = this.getTargetIndexes(data.links, removeNodeStore.node);
            inds.reverse()
            inds.map(function(i){ data.links.splice(i, 1) })

            /*remove node*/
            var ind = data.nodes.map(function(e) { return e.id; }).indexOf(removeNodeStore.node);
            data.nodes.splice(ind, 1)
            this.setState({data: data})

            console.log(JSON.stringify(data));
        }

    }

    getSourceIndexes(arr, val) {
        var indexes = [], i;
        for(i = 0; i < arr.length; i++)
            if (arr[i].source === val)
                indexes.push(i);
        return indexes;
    }

    getTargetIndexes(arr, val) {
        var indexes = [], i;
        for(i = 0; i < arr.length; i++)
            if (arr[i].target === val)
                indexes.push(i);
        return indexes;
    }

    componentDidMount(){
        this.setState({data: data});
        Actions.changeData(data);
    }

    componentDidUpdate(){
        if (this.state.data != dataStore.data)
            Actions.changeData(this.state.data);
    }

    onClickNode = function(nodeId) {
        console.log('Clicked node'+nodeId);
        Actions.selectNode(nodeId);
        Actions.focusNode(true);
        Actions.focusLink(false);

        if (!sourceStore.sNode) {
            Actions.addSource(nodeId);
           // this.setState({sNode : nodeId});
        }
        else{
            if (sourceStore.sNode == nodeId)
                Actions.addSource(null);
            else {
                Actions.addTarget(nodeId);
              //  this.setState({tNode : nodeId});
            }
        }
    };

    onClickLink = function(source, target) {
        console.log('Clicked link '+ source + ' - ' +  target);
        Actions.selectLink(source, target);
        Actions.focusNode(false);
        Actions.focusLink(true);
        // window.alert(`Clicked link between ${source} and ${target}`);
    };

    onMouseOverNode = function(nodeId) {
       // window.alert(`Mouse over node ${nodeId}`);
    };

    onMouseOutNode = function(nodeId) {
       // window.alert(`Mouse out node ${nodeId}`);
    };


    onMouseOverLink = function(source, target) {
       // window.alert(`Mouse over in link between ${source} and ${target}`);
    };

    onMouseOutLink = function(source, target) {
        //window.alert(`Mouse out link between ${source} and ${target}`);
    };

    render() {

// graph event callbacks

        const graphProps = {
            id :'graph', // id is mandatory, if no id is defined rd3g will throw an error
            data : data,
            config : this.state.config,
            onClickNode : this.onClickNode,
            onClickLink : this.onClickLink,
            onMouseOverNode : this.onMouseOverNode.bind(this),
            onMouseOutNode : this.onMouseOutNode.bind(this),
            onMouseOverLink : this.onMouseOverLink.bind(this),
            onMouseOutLink : this.onMouseOutLink.bind(this)
        };

        return (
            <div>
                <Graph ref='graph' {...graphProps} />
            </div>
        );
    }
}
export default myGraph ;
