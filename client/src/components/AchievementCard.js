import React from 'react';
import Card from 'react-bootstrap/Card';
import './AchievementCard.scss';


function AchievementCard(props) {
    return (
      <div className="AchievementCard">
  <Card>
    <Card.Header as="h5">{props.title}</Card.Header>
    <Card.Body>
      <div className="achievementInfo">
        <img className="achievementLogo" src={props.img}/>
        {props.description.length > 0 ?
          <p style={{ whiteSpace: 'pre-line' }}>
            {props.description.replace(
              new RegExp(`(.{1,40})(\\s+|$)`, 'g'),
              `$1\n`
            )}
          </p>
          :
          "No Description Available"
        }
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
