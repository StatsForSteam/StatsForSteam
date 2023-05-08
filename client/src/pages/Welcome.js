import "./Welcome.scss";
import LoginButton from "../components/buttons/LoginButton";

function Welcome() {
    return(
      <div>
        <h1 className="welcomeHeader"> Stats For Steam </h1>
        <h2 className="welcomeDescription"> The best place to find steam achievements</h2>
        <LoginButton />
      </div>
    )
}

export default Welcome;