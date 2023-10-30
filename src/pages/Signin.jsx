import "../styles/signin.css";
import { signInWithGoogle } from "../untils/helpers";

function Signin() {
  return (
    <div onClick={signInWithGoogle} class="google-btn">
      <div class="google-icon-wrapper">
        <img
          class="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p class="btn-text">
        <b>Sign in with google</b>
      </p>
    </div>
  );
}

export default Signin;
