
import React from 'react';
import './Achievements.scss';
import AchievementCard from '../components/AchievementCard';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col} from 'react-bootstrap';

function Achievements(){
  console.log("Achievements page rendered");
  const { state: { props: { appid, name, header, playtime } } } = useLocation();

  console.log("information passed to achievements page: ", appid, name, header, playtime);
  
  const [achieved, setAchieved] = useState(),
        [notachieved, setnotAchieved] = useState(),
        [achievedLen , setAchievedLen] = useState(),
        [notachievedLen , setnotAchievedLen] = useState(),
        [percentage, setPercentage] = useState(0),
        [searchTerm, setSearchTerm] = useState(""),
        [playerCount, setPlayerCount] = useState(0),
        [dataFetched, setDataFetched] = useState(false),
        [hasAchievements, setHasAchievements] = useState(false),
        [showLocked, setShowLocked] = useState(true),
        [showUnlocked, setShowUnlocked] = useState(true);

  useEffect(() => {
    fetch('/getAchievements', {
      method: "POST",
      body: JSON.stringify(appid),
      headers: { "content-type": "application/json" },
    }).then(response =>
      response.json().then(({ achieved, notachieved, achievedlength, notachievedlength, achievementPercentage, playerCount, hasAchievements }) => {
        setAchieved(achieved);
        setnotAchieved(notachieved);
        setAchievedLen(achievedlength);
        setnotAchievedLen(notachievedlength);
        setPercentage(achievementPercentage);
        setPlayerCount(playerCount);
        setHasAchievements(hasAchievements);
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
    UnlockedAchievements.push(<AchievementCard title = {achieved[i][0]} description = {achieved[i][1]} img = {achieved[i][2]} percentage = {achieved[i][3]} achieved = {achieved[i][4]} />);
  }
  const LockedAchievements = [];
  for (let i = 0; i < notachievedLen; i++) {
    LockedAchievements.push(<AchievementCard title = {notachieved[i][0]} description = {notachieved[i][1]} img = {notachieved[i][2]} percentage = {notachieved[i][3]} achieved = {notachieved[i][4]}/>);
  }

  const onFilterChange = (event) => {
    if (event.target.id === "unlocked") {
      setShowUnlocked(!showUnlocked);
    } 
    if(event.target.id === "locked") {
      setShowLocked(!showLocked);}
    }

  if (hasAchievements) {
      return(
        <div>

          <div className="Dashboard">
             <Container fluid>
                <Row>
                  <Col><div className="Circle">
                      <CircularProgressbar value={percentage} background={true} text={`${percentage}%`} styles={buildStyles({
                                            textColor: '#1363DF',
                                            backgroundColor: '#06283D',
                                            pathColor: '#1363DF',
                                            trailColor: '#06283D',
                                            })}/></div></Col>
                  <Col><h1>{name}</h1><img id="gameImg"src={header}></img> </Col>
                </Row> 
                <Row>
                  <Col><h2>Completed: {achievedLen} / {+achievedLen+notachievedLen}</h2></Col>
               <Col><h2>{playtime} hrs on record</h2>
                <h2>{playerCount} current players</h2></Col>
                </Row>
              </Container>
            </div>

              <div className="searchAndradio"> 
                <Form>
                  <Form.Group>
                      <Form.Control size="lg" type="input" placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                  </Form.Group>                
                </Form>
                  <div className="radioButtons">
                  <Form.Check
                      defaultChecked
                      label="Unlocked"
                      id="unlocked"
                      value="unlocked"
                      onChange={onFilterChange}
                    />
                    <Form.Check
                      defaultChecked
                      label="Locked"
                      id="locked"
                      value="locked"
                      onChange={onFilterChange}
                    />
                 </div>
              </div> 

            <div className="AchievementCardFlex">
              {showUnlocked && UnlockedAchievements && UnlockedAchievements.filter((val) => {
                if (searchTerm === "") {
                  return val
                } else if (val.props.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              })}
              {showLocked && LockedAchievements && LockedAchievements.filter((val) => {
                if (searchTerm === "") {
                  return val
                } else if (val.props.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              })}
            </div> 

        </div> 
      ) }
//dashboard for no achievements
      return(
        <div>
          <div className="Dashboard">
             <Container fluid>
                <Row>
                  <Col>
                    <div>
                      <h1>This game has no achievements</h1>
                    </div>
                  </Col>
                  <Col><h1>{name}</h1><img id="gameImg"src={header}></img> </Col>
                </Row> 
                <Row>
                  <Col></Col>
               <Col><h2>{playtime} hrs on record</h2>
                <h2>{playerCount} current players</h2></Col>
                </Row>
              </Container>
            </div>
        </div>
      )
  }

export default Achievements;


