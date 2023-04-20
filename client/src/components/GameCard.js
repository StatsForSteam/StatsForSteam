import Card from 'react-bootstrap/Card';
import ViewAchievements from './buttons/ViewAchievements';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./GameCard.scss";
 
function GameCard(){

    const img = "https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg"
    const title = "Rocket League"
    const completed = true;
    const amountOfAchievements = 147;
    const amountOfAchievementsCompleted = 65;

    return (
        <Card border="dark" style={{ width: '27.5rem'}}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {completed ? (
                        <div>
                            Completed All Achievements
                            <span id="boot-icon" class="bi bi-check-lg icon-green"></span>
                        </div>
                    ) : (
                        <div>
                            Currently: {amountOfAchievementsCompleted} / {amountOfAchievements}
                        </div>
                    )}
                </Card.Text>
                <ViewAchievements />
            </Card.Body>
        </Card>
    )
}

export default GameCard;

