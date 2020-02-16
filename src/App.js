import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Text from './components/Text';
import './App.css';
import helloWorld from './request';
import store from './utils/store';
import {GlobalEvent, EventBus} from './utils/event';

const initialName = '';
const initialResponse = null;

// before React Root render
// initialize
store.setDefault({
    loading: false,
});

const App = (props) => {

    const [name, setName] = useState(initialName);
    const [response, setResponse] = useState(initialResponse);

    async function onSendPbReq() {
        store.set('loading', true);
        GlobalEvent.emit('loading');
        console.log(store.get('loading'))
        const param = {name};
        const response = await helloWorld(param);
        store.set('loading', false);
        console.log(store.getStore())
        setResponse(response);
    }


    useEffect(() => {
            const cb = () => {
                console.log('loading')
            };
            // subscribe
            GlobalEvent.on('loading', cb);
            EventBus.on('loading', ({text}) => console.log(text));
            // return function to unsubscribe
            return () => {
                EventBus.off('loading', cb);
                GlobalEvent.remove('loading', cb);
            }
        },
        // 仅在 deps 里的变量发生变化时才执行effect
        []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
                <div
                    style={{marginTop: 16}}
                >
                    {`input: ${name}`}
                </div>
                {response && <div>{`response: ${response.hello}`}</div>}
                <a
                    className="App-link"
                    onClick={onSendPbReq}
                >
                    send request
                </a>
                <Text
                    text={name}
                />
            </header>
        </div>
    );
};

export default App;
