import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import helloWorld from './request';

const initialName = '';
const initialResponse = null;

const App = (props) => {

    const [name, setName] = useState(initialName);
    const [response, setResponse] = useState(initialResponse);

    async function onSendPbReq() {
        const param = {name};
        const response = await helloWorld(param);
        setResponse(response);
    }

    useEffect(() => {
        console.log(response);
    });

    return (
        <div className="App" >
            <header className="App-header" >
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
            </header>
        </div>
    );
};

// class App extends React.Component {
//     state = {
//         name: '',
//         response: '',
//     };
//
//     api = async () => {
//         try {
//             const params = {
//                 name: this.state.name
//             };
//             const response = await helloWorld(params);
//             this.setState({
//                 response
//             })
//         } catch (e) {
//
//         }
//     }
//
//     render() {
//
//     }
// }

export default App;
