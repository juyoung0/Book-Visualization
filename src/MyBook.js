/**
 * Created by juyoung on 2018-04-16.
 */

import React, { Component } from 'react';
import TextFileReader from './read-text-file-reader'


class MyBook extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text : ""
        };
    }


render()
    {
        var myTxt = require("./static/littlePrince.txt");
        return (

            <TextFileReader txt={myTxt} />
        );
    }

}

export default MyBook;