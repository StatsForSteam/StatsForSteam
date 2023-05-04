//user has now pressed the view achievments on a specific game and is now on the achievments page for that game
import React from 'react';
import './Achievements.scss';
import AchievementCard from '../components/AchievementCard';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Achievements(props){
  const { state } = useLocation();
  const appid = state;

  const [achieved, setAchieved] = React.useState();
  const [notachieved, setnotAchieved] = React.useState();
  const [achievedLen , setAchievedLen] = React.useState();
  const [notachievedLen , setnotAchievedLen] = React.useState();

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
      }))
  }, []);

  const UnlockedAchievements = [];
  for (let i = 0; i < achievedLen; i++) {
    UnlockedAchievements.push(<AchievementCard title = {achieved[i][0]} description = {achieved[i][1]} img = {achieved[i][2]}/>);
  }
  const LockedAchievements = [];
  for (let i = 0; i < notachievedLen; i++) {
    LockedAchievements.push(<AchievementCard title = {notachieved[i][0]} description = {notachieved[i][1]} img = {notachieved[i][2]}/>);
  }


      return(
        
            <div class="AchievementCardFlex">
              {UnlockedAchievements}
              {LockedAchievements}
            </div>
        
      )
  }

export default Achievements;

