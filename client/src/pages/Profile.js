import GameCard from "../components/GameCard";
import React, {useState, useEffect} from 'react';
import "./Profile.scss";
import Form from 'react-bootstrap/Form';
import "../index.scss";
import Loading from "../components/Loading";
import Row from 'react-bootstrap/Row';
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
    fetch('/getUserGames')
      .then(response => response.json())
      .then(data => {
        const { recentGames, playedGames, notPlayedGames } = data;
        
        const cards = recentGames.map(game => (
          <GameCard
            name={game[0]}
            header={game[2]}
            appid={game[1]}
            key={game[1]}
            playtime={game[3]}
            lastplayed={game[5]}
          />
        ));
        setRecentGames(cards);
  
        const playedCards = playedGames.map(game => (
          <GameCard
            name={game[0]}
            header={game[2]}
            appid={game[1]}
            key={game[1]}
            playtime={game[3]}
            lastplayed={game[5]}
          />
        ));
        const updatedPlayedGames = cards.concat(playedCards).sort((a, b) => b.props.playtime - a.props.playtime);
        setPlayedGames(updatedPlayedGames);
  
        const notPlayedCards = notPlayedGames.map(game => (
          <GameCard
            name={game[0]}
            header={game[2]}
            appid={game[1]}
            key={game[1]}
            playtime={game[3]}
          />
        ));
        setNotPlayedGames(notPlayedCards);
        
        setDataFetched(true);
      });
  }, []);
  




  
  if (!dataFetched) {
    return (
        <Loading />
    );
  }
  
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
              <div className="card-container">
              <Row xs={1} md={2} lg={4} className="g-4">
                {showRecent && recentGames && recentGames.filter((val) => (
                  searchTerm === "" || val.props.name.toLowerCase().includes(searchTerm.toLowerCase())
                ))}
                {showPlayed && playedGames && playedGames.filter((val) => (
                  searchTerm === "" || val.props.name.toLowerCase().includes(searchTerm.toLowerCase())
                ))}
                {showNotPlayed && notPlayedGames && notPlayedGames.filter((val) => (
                  searchTerm === "" || val.props.name.toLowerCase().includes(searchTerm.toLowerCase())
                ))}
              </Row>
              </div>   
  </div>
  );

  
}

export default Profile;


