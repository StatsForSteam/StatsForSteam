import GameCard from "../components/GameCard";
import React, {useState, useEffect} from 'react';
import "./Profile.scss";
import Form from 'react-bootstrap/Form';
import "../index.scss";

function Profile() {
  const [dataFetched, setDataFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentGames, setRecentGames] = useState([]);
  const [playedGames, setPlayedGames] = useState([]);
  const [notPlayedGames, setNotPlayedGames] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [showPlayed, setShowPlayed] = useState(true);
  const [showNotPlayed, setShowNotPlayed] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);

  useEffect(() => {
    fetch('/getUserGames').then(response => 
        response.json().then(data => {
          const recentGames = data.recentGames;
          const playedGames = data.playedGames;
          const notPlayedGames = data.notPlayedGames;
          const cards1 = [];
          const cards2 = [];
          const cards3 = [];
          for (let i = 0; i < recentGames.length; i++) {
            cards1.push(<GameCard name= {recentGames[i][0]} header = {recentGames[i][2]} appid = {recentGames[i][1]} key = {recentGames[i][1]} playtime={recentGames[i][3]} lastplayed={recentGames[i][5]}/>);
          }
         setRecentGames(cards1);
          
         for (let i = 0; i < playedGames.length; i++) {
            cards2.push(<GameCard name= {playedGames[i][0]} header = {playedGames[i][2]} appid = {playedGames[i][1]} key = {playedGames[i][1]} playtime={playedGames[i][3]} lastplayed={playedGames[i][5]}/>);
            console.log(playedGames[i][5])
          }
          setPlayedGames(cards1.concat(cards2).sort((b, a) => a.props.playtime - b.props.playtime));

          for (let i = 0; i < notPlayedGames.length; i++) {
            cards3.push(<GameCard name= {notPlayedGames[i][0]} header = {notPlayedGames[i][2]} appid = {notPlayedGames[i][1]} key = {notPlayedGames[i][1]} playtime={notPlayedGames[i][3]}/>);
          }
          setNotPlayedGames(cards3);
          setDataFetched(true);
    }))
  }, []);




 const onFilterChange = (event) => {
    if (event.target.id === "recent") {
      setShowRecent(!showRecent);
      setShowPlayed(!showPlayed);
      setDisabled2(!disabled2);
    }
    if (event.target.id === "played") {
      setShowNotPlayed(!showNotPlayed);
      setShowPlayed(!showPlayed);
      setDisabled1(!disabled1);
    }
  }

  
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

  return (
    <div>
      <div className="searchAndradio"> 
                <Form>
                  <Form.Group>
                      <Form.Control size="lg" type="input" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--quaternary-color)'}} placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                  </Form.Group>                
                </Form>
                  <div className="radioButtons">
                  {disabled1 ? (
                  <Form.Check 
                  disabled
                      label="Recently Played"
                      id="recent"
                      onChange={onFilterChange}
                    /> )
                    : (
                      <Form.Check
                      label="Recently Played"
                      id="recent"
                      onChange={onFilterChange}
                    /> )}
                    
                    {disabled2 ? (
                    <Form.Check
                    disabled
                      label ="Not Played"
                      id="played"
                      onChange={onFilterChange}
                    /> ) : (
                      <Form.Check
                      label ="Not Played"
                      id="played"
                      onChange={onFilterChange}
                    /> )}
                 </div>
              </div>
              <div className="cardFlex">
              {showRecent && recentGames && recentGames.filter((val) => {
                  if (searchTerm === "") {
                    return val
                  } else if (val.props.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                  }
                })}
                {showPlayed && playedGames && playedGames.filter((val) => {
                if (searchTerm === "") {
                  return val
                } else if (val.props.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              })}
              {showNotPlayed && notPlayedGames && notPlayedGames.filter((val) => {
                if (searchTerm === "") {
                  return val
                } else if (val.props.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              })}
              </div>
  </div>
  );
}

export default Profile;


