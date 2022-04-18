import { useState, FC, useEffect } from 'react';
import { apiGetBox, apiPatchBox } from '../api-mock-0/api';
import { Box } from '../api-mock-0/structure';
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

    const setBoxMove = (id: number, isChecked: boolean) => {
        switch (id) {
            case 0:
                setBox0Move(isChecked);
                break;
            case 1:
                setBox1Move(isChecked);
                break;
            case 2:
                setBox2Move(isChecked);
                break;
            default:
                break;
        }
    }

    const patchBoxMove = (id: number, isChecked: boolean) => {
        const box: Box = { id: id, move: isChecked };

        apiPatchBox(id, box)
            .then(_ => setBoxMove(id, isChecked))
            .catch(e => {
                console.log(e)
            });
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
                <div style={{paddingBottom: "0.3rem"}}>URL:
                    <input
                        style={{ width: "16rem" }}
                        type="text"
                        value={baseURL}
                        onChange={e => setBaseURL(e.target.value)}
                        placeholder="URL"
                    />
                </div>
                <div style={{paddingBottom: "0.3rem"}}>Username:
                    <input
                        style={{ width: "10rem" }}
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div style={{paddingBottom: "0.3rem"}}>Password:
                    <input
                        style={{ width: "10rem" }}
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <button type="submit" onClick={e => saveSettings()}>Submit</button>
            </div>

            <hr />
            <button type="submit" onClick={e => getBox()}>Get</button>

            <hr />

            <Switch label="Box0:" isChecked={box0Move} onChange={isChecked => patchBoxMove(0, isChecked)} />
            <Switch label="Box1:" isChecked={box1Move} onChange={isChecked => patchBoxMove(1, isChecked)} />
            <Switch label="Box2:" isChecked={box2Move} onChange={isChecked => patchBoxMove(2, isChecked)} />
        </>
    );
}