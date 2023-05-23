import Card from 'react-bootstrap/Card';
import ViewAchievements from './buttons/ViewAchievements';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./GameCard.scss";
import { useState } from 'react';
import '../index.scss';
import ForumsButton from './buttons/ForumsButton';
import {Row, Col} from 'react-bootstrap';

function GameCard(props) {
  const [hasHeader, setHasHeader] = useState(true);
  const handleHeaderError = () => setHasHeader(false);
  const headerImage = hasHeader ? props.header : null;

  return (
    headerImage ? (
      <div className="GameCard">
  <Card style={{ backgroundColor: 'var(--secondary-color)'}} border="dark">
    <Card.Img variant="top" src={headerImage} onError={handleHeaderError} />
    <Card.Body>
      <Card.Title style={{ color: 'var(--tertiary-color)' }}>
        {props.name.length > 37 ? `${props.name.slice(0, 37)}...` : props.name}
      </Card.Title>
      <Card.Text>
       <div id="under-header">
          <div>
            <div style={{ color: 'var(--quaternary-color)' }}>Currently: {props.playtime} hours</div>
            <div style={{ color: 'var(--quaternary-color)' }}>Last Played: {props.lastplayed}</div>
          </div>
          <Row xs={2} md={2} lg={2} className="g-2">
            <ViewAchievements props={props} />
            <ForumsButton props={props} />
          </Row>
        </div>
      </Card.Text>
    </Card.Body>
  </Card>
</div>


    ) : null
  );
}

export default GameCard;








