import "./Welcome.css";
import LoginButton from "../../components/buttons/LoginButton";

function Welcome() {
    return(
      <div class="Wrapper">
        <div class="HeaderFlexBox">
            <h1 class="Header HeaderText"> Stats For Steam </h1>
            <h1 class="SubHeader HeaderText"> The best place to find steam achievements</h1>
        </div>
        <LoginButton />
      </div>
    )
}
  
export default Welcome;