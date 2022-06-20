import { useState, FC, useEffect } from "react";
import { apiGetBox, apiGetStats, apiPatchBox } from "../api-box/api";
import { Box__c } from "../api-box/structure";
import "../App.css";

import { Switch } from "../components-common/Switch";
import {
  BASE_URL,
  USERNAME,
  PASSWORD,
  USERNAME_KEY,
  PASSWORD_KEY,
  BASE_URL_KEY,
  POLLING_TIMER,
} from "../parameters/constants";

export const HomePage: FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [baseURL, setBaseURL] = useState<string>(BASE_URL);
  const [username, setUsername] = useState<string>(USERNAME);
  const [password, setPassword] = useState<string>(PASSWORD);

  const [box0Move, setBox0Move] = useState<boolean>(false);
  const [box1Move, setBox1Move] = useState<boolean>(false);
  const [box2Move, setBox2Move] = useState<boolean>(false);

  const [box0Count, setBox0Count] = useState<number>(0);
  const [box1Count, setBox1Count] = useState<number>(0);
  const [box2Count, setBox2Count] = useState<number>(0);
  
  const saveSettings = () => {
    if (username != "" && password != "") {
      localStorage.setItem(USERNAME_KEY, username);
      localStorage.setItem(PASSWORD_KEY, password);
    }
    if (baseURL != "") {
      localStorage.setItem(BASE_URL_KEY, baseURL);
    }

    setShowSettings(false);
  };

  const getStats = () => {
    apiGetStats().then(r => {
      r.forEach(e => {
        switch(e.id) {
          case 0:
            setBox0Count(e.count);
            break;
          case 1:
            setBox1Count(e.count);
            break;
          case 2:
            setBox2Count(e.count);
            break;
          default:
            break;
        }
      }); 
    });
  }

  const setBoxMove = (id__c: number, isChecked: boolean) => {
    switch (id__c) {
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
  };

  const patchBoxMove = (id: number, isChecked: boolean) => {
    const box: Box__c = { id__c: id, move__c: isChecked };

    apiPatchBox(id, box)
      .then((_) => setBoxMove(id, isChecked))
      .catch((e) => {
        console.log(e);
      });
  };

  const updateBoxes = () => {
    apiGetBox().then((r) => {
      //console.log(r);
      r.forEach((b) => {
        switch (b.id__c) {
          case 0:
            setBox0Move(b.move__c);
            break;
          case 1:
            setBox1Move(b.move__c);
            break;
          case 2:
            setBox2Move(b.move__c);
            break;
          default:
            break;
        }
      });
    });
  };

  const startPolling = () => {
    setInterval(() => {
      updateBoxes();
    }, POLLING_TIMER);
  };

  useEffect(() => {
    startPolling();
  }, []);

  return (
    <>
      <div className="default" style={{ paddingLeft: "0.8rem", paddingRight: "0.8rem" }}>
        <h1>Box API Service</h1>

        <Switch
          label="Box0:"
          isChecked={box0Move}
          onChange={(isChecked) => patchBoxMove(0, isChecked)}
        />
        <Switch
          label="Box1:"
          isChecked={box1Move}
          onChange={(isChecked) => patchBoxMove(1, isChecked)}
        />
        <Switch
          label="Box2:"
          isChecked={box2Move}
          onChange={(isChecked) => patchBoxMove(2, isChecked)}
        />

        <hr />
        {showSettings && (
          <>
            <div style={{ paddingBottom: "0.3rem" }}>
              URL:
              <input
                style={{ width: "16rem" }}
                type="text"
                value={baseURL}
                onChange={(e) => setBaseURL(e.target.value)}
                placeholder="URL"
              />
            </div>
            <div style={{ paddingBottom: "0.3rem" }}>
              Username:
              <input
                style={{ width: "10rem" }}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div style={{ paddingBottom: "0.3rem" }}>
              Password:
              <input
                style={{ width: "10rem" }}
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button className="small-button" type="submit" onClick={(e) => saveSettings()}>
              Save
            </button>
          </>
        )}

        {!showSettings && (
          <button className="small-button" type="submit" onClick={(e) => setShowSettings(true)}>
            Settings
          </button>
        )}

        <hr />
        <button className="small-button" type="submit" onClick={(e) => getStats()}>
          Stats
        </button>
        <div>Box0: {box0Count}, Box1: {box1Count}, Box2: {box2Count}</div>

        <hr />
      </div>
    </>
  );
};
