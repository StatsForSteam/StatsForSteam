import AchievementCard from "../components/GameCard";
import "./Profile.scss";


function Profile() {
  const GamesOwned = 50;
  const cards = [];
  for (let i = 0; i < GamesOwned; i++) {
    cards.push(<AchievementCard />);
  }
  return (
    <div class="cardFlex">
      {cards}
    </div>
  );
}

export default Profile;



