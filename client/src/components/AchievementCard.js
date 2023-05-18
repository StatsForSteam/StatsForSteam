import React from 'react';
import Card from 'react-bootstrap/Card';
import './AchievementCard.scss';
import {FaLockOpen,FaLock} from 'react-icons/fa';
import '../index.scss';

function AchievementCard(props) {
    return (
      <div className="AchievementCard">
  <Card style={{ backgroundColor: 'var(--secondary-color)'}}>
    <Card.Header as="h5" style={{ color: 'var(--tertiary-color)' }}> {props.title}{props.achieved ? (
            <FaLockOpen id="Lock"/>) : <FaLock id="Lock"/>}</Card.Header>
    <Card.Body>
      <div className="achievementInfo">
        <img className="achievementLogo" src={props.img}/>
        {props.description.length > 0 ? ( props.description) :("No Description Available")}
      </div>
      <div className="percentage">
          <Card.Subtitle className="mb-2 text-muted"> {props.percentage}% of players have unlocked this achievement</Card.Subtitle>
      </div>
    </Card.Body>
  </Card>
</div>
)      
}

export default AchievementCard;


