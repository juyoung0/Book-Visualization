/**
 * Created by juyoung on 2018-04-05.
 */
import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import {nodeStore, sourceStore, targetStore, linkStore} from './stores'
import {Actions} from './actions';


// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
    links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    width : 2000,
    height : 800,
    node: {
        color: 'lightgreen',
        size: 220,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
};

class myGraph extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            config : myConfig,
            data : '',
            node : null,
            sNode : null,
            tNode : null,
        };
        nodeStore.onChange=()=>{
            data.nodes.push({id:nodeStore.node})
            this.setState({data: data})
        }
        sourceStore.onChange=()=>{
            this.setState({sNode: sourceStore.sNode})
        }
        targetStore.onChange=()=>{
            this.setState({tNode: targetStore.tNode})
        }
        linkStore.onChange=()=>{
            data.links.push({source:linkStore.sNode,target:linkStore.tNode})
            this.setState({data: data})
        }
    }

    componentDidUpdate(){
      // if(this.state.sNode!=null && this.state.tNode!=null)
         //  Actions.addLink(this.state.sNode, this.state.tNode);
    }

    onClickNode = function(nodeId) {
        console.log('Clicked node'+nodeId);

        if (!this.state.sNode) {
            Actions.addSource(nodeId);
        }
        else{
          //  if (this.state.sNode == nodeId)
          //      this.setState({sNode : null});
           // else {
            Actions.addTarget(nodeId);
           // }
        }
    };

    onMouseOverNode = function(nodeId) {
       // window.alert(`Mouse over node ${nodeId}`);
    };

    onMouseOutNode = function(nodeId) {
       // window.alert(`Mouse out node ${nodeId}`);
    };

    onClickLink = function(source, target) {
       // window.alert(`Clicked link between ${source} and ${target}`);
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
            onClickNode : this.onClickNode.bind(this),
            onClickLink : this.onClickLink.bind(this),
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