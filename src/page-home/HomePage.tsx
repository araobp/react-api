import { useState, FC, useEffect } from 'react';
import { apiGetBox } from '../api-mock-0/api';
import '../App.css';

import { Switch } from '../components-common/Switch';
import { BASE_URL, USERNAME, PASSWORD, USERNAME_KEY, PASSWORD_KEY, BASE_URL_KEY } from '../parameters/constants';

export const HomePage: FC = () => {
    
    const [baseURL, setBaseURL] = useState<string>(BASE_URL);
    const [username, setUsername] = useState<string>(USERNAME);
    const [password, setPassword] = useState<string>(PASSWORD);

    const [box0Move, setBox0Move] = useState<boolean>(false);
    const [box1Move, setBox1Move] = useState<boolean>(false);
    const [box2Move, setBox2Move] = useState<boolean>(false);

    const saveSettings = () => {
        if (username != "" && password != "") {
            localStorage.setItem(USERNAME_KEY, username);
            localStorage.setItem(PASSWORD_KEY, password);
        }
        if (baseURL != "") {
            localStorage.setItem(BASE_URL_KEY, baseURL);
        }
    }

    const getBox = () => {
        apiGetBox()
        .then(r => console.log(r));
    }

    useEffect(() => {
        apiGetBox()
        .then(r => {
            console.log(r)
            setBox0Move(r[0].move);
            setBox1Move(r[1].move);
            setBox2Move(r[2].move);
        });
    }, []);
   
    return (
        <>
            <h1>API Test</h1>
            <hr />
            <div>
                <label>URL:
                    <input
                        style={{ width: "16rem" }}
                        type="text"
                        value={baseURL}
                        onChange={e => setBaseURL(e.target.value)}
                        placeholder="URL"
                    />
                </label>
                <br/>
                <label>Username:
                    <input
                        style={{ width: "16rem" }}
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </label>
                <br/>
                <label>Password:
                    <input
                        style={{ width: "16rem" }}
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </label>
                <br/>
                <button type="submit" onClick={e => saveSettings()}>Submit</button>
            </div>

            <hr/>
                <button type="submit" onClick={e => getBox()}>Get</button>
            
            <hr/>

            <Switch label="Box0:" isChecked={box0Move} onChange={isChecked=>setBox0Move(isChecked)}/>
            <Switch label="Box1:" isChecked={box1Move} onChange={isChecked=>setBox1Move(isChecked)}/>
            <Switch label="Box2:" isChecked={box2Move} onChange={isChecked=>setBox2Move(isChecked)}/>
        </>
    );
}