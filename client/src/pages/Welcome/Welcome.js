import "./Welcome.css";
import "../../assets/css/tailwind.css"
import LoginButton from "../../components/buttons/LoginButton";

function Welcome() {
    return(
      <div class="flex flex-col gap-3 items-center">
        <h1 class="text-primary text-7xl text-center pt-6 font-Roboto font-medium"> Stats For Steam </h1>
        <h1 class="text-primary text-3xl text-center font-Roboto font-light"> The best place to find steam achievements</h1>
        <LoginButton />
      </div>
    )
}

export default Welcome;