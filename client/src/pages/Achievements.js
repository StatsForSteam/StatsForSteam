
import React from 'react';
import './Achievements.scss';
import AchievementCard from '../components/AchievementCard';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col} from 'react-bootstrap';
import "../index.scss";
import Loading from "../components/Loading";
import {BsFillClockFill,BsPeopleFill,BsFillCalendarWeekFill} from "react-icons/bs";
import { IconContext } from "react-icons";

function Achievements(){

  const { state: { props: { appid, name, header, playtime, lastplayed } } } = useLocation();
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
  }, [appid]);
  

  if (!dataFetched) {
    return (
      <Loading/>
    );
  }
 
  const UnlockedAchievements = [];
  for (let i = 0; i < achievedLen; i++) {
    UnlockedAchievements.push(<AchievementCard title = {achieved[i][0]} description = {achieved[i][1]} img = {achieved[i][2]} percentage = {achieved[i][3]} achieved = {achieved[i][4]} />);
    UnlockedAchievements.sort((b,a) => a.props.percentage - b.props.percentage);
  }
  const LockedAchievements = [];
  for (let i = 0; i < notachievedLen; i++) {
    LockedAchievements.push(<AchievementCard title = {notachieved[i][0]} description = {notachieved[i][1]} img = {notachieved[i][2]} percentage = {notachieved[i][3]} achieved = {notachieved[i][4]}/>);
    LockedAchievements.sort((b,a) => a.props.percentage - b.props.percentage);
  }

  const onFilterChange = (event) => {
    if (event.target.id === "unlocked") {
      setShowLocked(!showLocked);
    } 
    if(event.target.id === "locked") {
      setShowUnlocked(!showUnlocked);}
    }

  if (hasAchievements) {
      return(
        <div>

          <div className="Dashboard">
             <Container fluid>
                <Row>
                  <Col> 
                      <div className="Circle">
                        <CircularProgressbar value={percentage} background={true} text={`${percentage}%`} styles={buildStyles({
                                              textColor: 'var(--quaternary-color)',
                                              backgroundColor: 'var(--primary-color)',
                                              pathColor: 'var(--quaternary-color)',
                                              trailColor: 'var(--primary-color)',
                                              })}/>
                      </div>
                      <h3>Completed: {achievedLen} / {+achievedLen+notachievedLen} Achievements</h3>
                  </Col>
                  <Col>
                    <h1>{name}</h1>
                    <ul>
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><BsFillClockFill size={40}/></IconContext.Provider> <span className="stats-spacing"> {playtime} <span className="stats-text"> hrs on record </span></span></h3> 
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><BsPeopleFill size={40}/></IconContext.Provider> <span className="stats-spacing">{playerCount} <span className="stats-text"> current players</span></span></h3>
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><BsFillCalendarWeekFill size={40} /> </IconContext.Provider><span className="stats-spacing"> {lastplayed} <span className="stats-text"> last played</span></span></h3> 
                    </ul>
                  </Col>
                  <Col>
                    <img alt="steam header" id="gameImg"src={header}></img> 
                  </Col>
                </Row>
              </Container>
            </div>

              <div className="searchAndradio"> 
                <Form>
                  <Form.Group>
                      <Form.Control size="lg" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--quaternary-color)'}} type="input" placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                  </Form.Group>                
                </Form>
                  <div className="radioButtons">
                    {showUnlocked ? (
                  <Form.Check
                      label="Unlocked"
                      id="unlocked"
                      value="unlocked"
                      onChange={onFilterChange}
                    /> ):(

                  <Form.Check
                      disabled
                      label="Unlocked"
                      id="unlocked"
                      value="unlocked"
                      onChange={onFilterChange}
                    />)}
                    {showLocked ? (
                    <Form.Check
                      label="Locked"
                      id="locked"
                      value="locked"
                      onChange={onFilterChange}
                    /> ):(

                      <Form.Check
                      disabled
                      label="Locked"
                      id="locked"
                      value="locked"
                      onChange={onFilterChange}
                    />)}
                 </div>
              </div> 

            <div className="AchievementCardFlex">
              {showUnlocked && UnlockedAchievements && UnlockedAchievements.filter((val) => {
                if (searchTerm === "") {
                  return val
                } else if (val.props.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
                return null;
              })}
              {showLocked && LockedAchievements && LockedAchievements.filter((val) => {
                if (searchTerm === "") {
                  return val
                } else if (val.props.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
                return null;
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
                  <Col><h1>{name}</h1><img alt="steam header" id="gameImg"src={header}></img> </Col>
                </Row> 
                <Row>
                  <Col></Col>
               <Col><h2>{playtime} hrs on record</h2>
                <h2>{playerCount} current players</h2>
                <h2>Last Played: {lastplayed}</h2>
                </Col>
                </Row>
              </Container>
            </div>
        </div>
      )
  }

export default Achievements;


