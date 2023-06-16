
import React from 'react';
import './Achievements.scss';
import AchievementCard from '../components/AchievementCard';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import 'react-circular-progressbar/dist/styles.css';
import Form from 'react-bootstrap/Form';
import {Row,Col, Container} from 'react-bootstrap';
import "../index.scss";
import Loading from "../components/Loading";
import Dashboard from "../components/Dashboard";

function Achievements(){
  //unwrap props for dashboard use
  const { state: { props: { appid, name, header, playtime, lastplayed,hasAchievements } } } = useLocation();
 
  const [achieved, setAchieved] = useState(),
        [notachieved, setnotAchieved] = useState(),
        [achievedLen , setAchievedLen] = useState(),
        [notachievedLen , setnotAchievedLen] = useState(),
        [percentage, setPercentage] = useState(0),
        [searchTerm, setSearchTerm] = useState(""),
        [playerCount, setPlayerCount] = useState(0),
        [dataFetched, setDataFetched] = useState(false),
        [showLocked, setShowLocked] = useState(true),
        [showUnlocked, setShowUnlocked] = useState(true);

        useEffect(() => {
          if (hasAchievements) {
            fetch('http://127.0.0.1:8000/api/getAchievements', {
              method: "POST",
              body: JSON.stringify({ appid, hasAchievements }),
              headers: { "content-type": "application/json" },
            }).then(response =>
              response.json().then(({ achieved, notachieved, achievedlength, notachievedlength, achievementPercentage, playerCount }) => {
                setAchieved(achieved);
                setnotAchieved(notachieved);
                setAchievedLen(achievedlength);
                setnotAchievedLen(notachievedlength);
                setPercentage(achievementPercentage);
                setPlayerCount(playerCount);
                setDataFetched(true);
              })
            );
          } else {
            fetch('http://127.0.0.1:8000/api/getAchievements', {
              method: "POST",
              body: JSON.stringify({ appid, hasAchievements }),
              headers: { "content-type": "application/json" },
            }).then(response =>
              response.json().then(({ playerCount }) => {
                setPlayerCount(playerCount);
                setDataFetched(true);
              })
            );
          }
        }, [appid, hasAchievements]);
        
  

  if (!dataFetched) {
    return (
      <Loading/>
    );
  }
 
  const UnlockedAchievements = [];
  for (let i = 0; i < achievedLen; i++) {
    UnlockedAchievements.push(<AchievementCard key={achieved[i][0]} title = {achieved[i][0]} description = {achieved[i][1]} img = {achieved[i][2]} percentage = {achieved[i][3]} achieved = {achieved[i][4]} />);
    UnlockedAchievements.sort((b,a) => a.props.percentage - b.props.percentage);
  }
  const LockedAchievements = [];
  for (let i = 0; i < notachievedLen; i++) {
    LockedAchievements.push(<AchievementCard key={notachieved[i][0]} title = {notachieved[i][0]} description = {notachieved[i][1]} img = {notachieved[i][2]} percentage = {notachieved[i][3]} achieved = {notachieved[i][4]}/>);
    LockedAchievements.sort((b,a) => a.props.percentage - b.props.percentage);
  }

  const onFilterChange = (event) => {
    if (event.target.id === "unlocked") {
      setShowLocked(!showLocked);
    } 
    if(event.target.id === "locked") {
      setShowUnlocked(!showUnlocked);}
    }


      return(
        <div>
          <Dashboard
            percentage={percentage}
            achievedLen={achievedLen}
            notachievedLen={notachievedLen}
            name={name}
            playtime={playtime}
            playerCount={playerCount}
            lastplayed={lastplayed}
            header={header}
            appid={appid}
            location={"Achievements"}
            hasAchievements={hasAchievements}
          />
        {hasAchievements && (
              <div id="search-container">
              <Container>
                <Row className="justify-content-md-center" md={2}>
                  <Col lg={5}>
                    <Form>
                      <Form.Group>
                        <Form.Control size="lg" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--quaternary-color)'}} type="input" placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                      </Form.Group>                
                    </Form>
                  </Col>
                  <Col lg="auto" md="auto">
                    <div className="radioButtons">
                      <Form.Check
                        className="radio-button"
                        label="Unlocked"
                        id="unlocked"
                        value="unlocked"
                        onChange={onFilterChange}
                        disabled={!showUnlocked}
                      />
                      <Form.Check
                        className="radio-button"
                        label="Locked"
                        id="locked"
                        value="locked"
                        onChange={onFilterChange}
                        disabled={!showLocked}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            ) }

                <div className="card-container">
                <Row xs={1} md={2} lg={4} className="g-4">
                  {showUnlocked &&
                    UnlockedAchievements &&
                    UnlockedAchievements.filter((val) => (
                      searchTerm === "" || val.props.title.toLowerCase().includes(searchTerm.toLowerCase())
                    ))}
                  {showLocked &&
                    LockedAchievements &&
                    LockedAchievements.filter((val) => (
                      searchTerm === "" || val.props.title.toLowerCase().includes(searchTerm.toLowerCase())
                    ))}
                </Row>
                </div>
        </div> 
      ) 
  }


   

export default Achievements;


