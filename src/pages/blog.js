import React from 'react';
import {useParams} from 'react-router-dom';

export default function BlogPost(props) {
    let {num} = useParams();
    let {name} = useParams();
    // let name = props.match.params.num;
    // console.log('in blog', num);
    return (<div>The params is {name}--{num}</div>);
}