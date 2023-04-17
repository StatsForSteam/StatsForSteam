import "./Welcome.css";
import LoginButton from "../components/buttons/LoginButton";

function Welcome() {
    return(
      <div>
        <h1> Stats For Steam </h1>
        <h1> The best place to find steam achievements</h1>
        <LoginButton />
      </div>
    )
}

export default Welcome;