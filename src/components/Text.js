import React from 'react';
import {EventBus} from '../utils/event';

const Text = (props) => {
    return (
        <div onClick={()=>EventBus.emit('loading', {text: props.text})}>{props.text}</div>
    );
};

export default Text;
