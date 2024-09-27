import "./styles.scss";
import wallpaper from "@/assets/images/wallpaper.png";

const prefix = "m-wallpaper";

const WallpaperModule = () => {
  return (
    <div className={prefix}>
      <img src={wallpaper} alt="Imagen" />
    </div>
  );
};

export default WallpaperModule;
