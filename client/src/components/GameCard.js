import Card from 'react-bootstrap/Card';
import ViewAchievements from './buttons/ViewAchievements';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./GameCard.scss";
import { useEffect,useState } from 'react';




function GameCard(props) {

    const [hasHeader, setHasHeader] = useState(true);
    const handleHeaderError = () => setHasHeader(false);
    const headerImage = hasHeader ? props.header : "https://lh3.googleusercontent.com/drive-viewer/AFGJ81qyfn8YWx7WFAVS3ZhFb74tE1ZPjvV8qrJJdsrcAylJghMHCeq7MBKmD1FBPKPuLYQlNYmbIfwBBUNKUihbOPMEGNpNJg=s2560";
    return (
      <div className="GameCard">
        <Card border="dark" style={{ width: '27.5rem' }}>
          <Card.Img variant="top" src={headerImage} onError={handleHeaderError} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
              <div>Currently: {props.playtime} hours</div>
            </Card.Text>
            <ViewAchievements props={props} />
          </Card.Body>
        </Card>
      </div>
    );
  }

export default GameCard;





