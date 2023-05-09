import GameCard from "../components/GameCard";
import React, {useState, useEffect} from 'react';
import "./Profile.scss";
import Form from 'react-bootstrap/Form';


function Profile() {
  const [cards, setCards] = useState();
  const [dataFetched, setDataFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/getUserGames').then(response => 
        response.json().then(data => {
          const userGames = data.games
          const numGames = data.games.length
          const cardArray = []
          for (let i = 0; i < numGames; i++) {
            cardArray.push(<GameCard name= {userGames[i][0]} header = {userGames[i][2]} appid = {userGames[i][1]} key = {userGames[i][1]}/>);
          }
          setCards(cardArray);
          setDataFetched(true);
    }))
  }, []);

  return (



    <div>
      
      <div className="searchBar"> 
        <Form>
          <Form.Group>
              <Form.Control size="lg" type="input" placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
          </Form.Group>
        </Form>
      </div>
      
      {dataFetched ? (
        <div className="cardFlex">
          {cards && cards.filter((val) => {
            if (searchTerm === "") {
              return val
            } else if (val.props.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          })}
        </div>
      ) : (
        <div className="loading">
          <h2 className="loadingText"> Loading...</h2>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
  </div>

  );
}

export default Profile;

// {/* <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="input" placeholder="Enter email" />
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group> */}