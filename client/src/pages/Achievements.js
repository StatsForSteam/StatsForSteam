
import React from 'react';
import './Achievements.scss';
import AchievementCard from '../components/AchievementCard';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Form from 'react-bootstrap/Form';


function Achievements(props){
  const { state } = useLocation();
  const appid = state;

  const [achieved, setAchieved] = useState();
  const [notachieved, setnotAchieved] = useState();
  const [achievedLen , setAchievedLen] = useState();
  const [notachievedLen , setnotAchievedLen] = useState();
  const [percentage, setPercentage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch('/getAchievements', {
      method: "POST",
      body: JSON.stringify(appid),
      headers: { "content-type": "application/json" },
    }).then(response =>
      response.json().then(data => {
        setAchieved(data.achieved);
        setnotAchieved(data.notachieved);
        setAchievedLen(data.achievedlength);
        setnotAchievedLen(data.notachievedlength);
        setPercentage(data.achievementPercentage);
        setDataFetched(true);
      }))
  }, []);


  if (!dataFetched) {
    return (
      <div className="loading">
        <h2 className="loadingText">Loading...</h2>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  const UnlockedAchievements = [];
  for (let i = 0; i < achievedLen; i++) {
    UnlockedAchievements.push(<AchievementCard title = {achieved[i][0]} description = {achieved[i][1]} img = {achieved[i][2]}/>);
  }
  const LockedAchievements = [];
  for (let i = 0; i < notachievedLen; i++) {
    LockedAchievements.push(<AchievementCard title = {notachieved[i][0]} description = {notachieved[i][1]} img = {notachieved[i][2]}/>);
  }

      return(
        <div>
            <div className="Dashboard">
              <div className="Circle">
                  <CircularProgressbar value={percentage} background={true} text={`${percentage}%`} styles={buildStyles({
                    textColor: '#1363DF',
                    backgroundColor: 'black',
                    pathColor: '#1363DF',
                    trailColor: '#DFF6FF',
                    })}/>
                </div>   
              </div>
              <div className="searchBar"> 
                <Form>
                  <Form.Group>
                      <Form.Control size="lg" type="input" placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                  </Form.Group>
                </Form>
              </div>
            <div className="AchievementCardFlex">
              {UnlockedAchievements && UnlockedAchievements.filter((val) => {
                if (searchTerm === "") {
                  return val
                } else if (val.props.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              })}
              {LockedAchievements && LockedAchievements.filter((val) => {
                if (searchTerm === "") {
                  return val
                } else if (val.props.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              })}
            </div>
        </div>
      )
  }

export default Achievements;


