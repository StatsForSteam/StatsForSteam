import GameCard from "../components/GameCard";
import React, {useState, useEffect} from 'react';
import "./Profile.scss";
import "../index.scss";
import Loading from "../components/Loading";
import {Form, Row, Col, Container} from 'react-bootstrap';

function Profile() {
  const [dataFetched, setDataFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [playedGames, setPlayedGames] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [showPlayed, setShowPlayed] = useState(true);
  const [showNotPlayed, setShowNotPlayed] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/getUserGames", {credentials: 'include'}).then(response => 
        response.json().then(data => {
          const playedGames = data.playedGames;
          const cards = [];

         for (let i = 0; i < playedGames.length; i++) {
            cards.push(<GameCard name= {playedGames[i][0]} header = {playedGames[i][2]} appid = {playedGames[i][1]} key = {playedGames[i][1]} playtime={playedGames[i][3]} hasAchievements={playedGames[i][4]}/>);
          }
          setPlayedGames(cards.sort((b, a) => a.props.playtime - b.props.playtime));
          setDataFetched(true);
    })) 
  }, []);
 
  if (!dataFetched) {
    return (
        <Loading />
    );
  }

  return (
    <>
     <div id="search-container">
        <Container>
            <Row className="justify-content-md-center" md={2}>
              <Col lg={5}>
                <Form>
                  <Form.Group>
                      <Form.Control size="lg" type="input" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--quaternary-color)'}} placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                  </Form.Group>                
                </Form>
              </Col>
              </Row>
            </Container>
          </div>
              <div className="card-container">
              <Row xs={1} md={2} lg={4} className="g-4">
                {showPlayed && playedGames && playedGames.filter((val) => (
                  searchTerm === "" || val.props.name.toLowerCase().includes(searchTerm.toLowerCase())
                ))}
              </Row>
              </div>   
  </>
  );
}

export default Profile;


