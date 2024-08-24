import FormModule from "../modules/Form";
import WallpaperModule from "../modules/Wallpaper";
import "./styles.scss";

const prefix = "p-login";

const LoginPage = () => {
  return (
    <div className={prefix}>
      <FormModule />
      <WallpaperModule />
    </div>
  );
};

export default LoginPage;
