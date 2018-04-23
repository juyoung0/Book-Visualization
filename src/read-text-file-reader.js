/**
 * Created by juyoung on 2018-04-16.
 * from : https://gist.github.com/longsangstan/3c259ed76c25784bd17694aab05a37af
 */

import React from "react";


/*
 Read a text file and out put the content.

 Example Usage:
 var myTxt = require("./myTxt.txt");
 ...
 <TextFileReader
 txt={myTxt}
 />
 */
class TextFileReader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };
    }

    componentDidMount() {
        this.readTextFile(this.props.txt);
    }

    readTextFile = file => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    this.setState({
                        text: allText
                    });
                }
            }
    }   ;
    rawFile.send(null);
    };

    render() {
        return (
            <div>
            {this.state.text.split("\n").map((item, key) => {
                return <span key={key}>{item}<br /></span>;
            })}
        </div>
        );
    }
}

export default TextFileReader;