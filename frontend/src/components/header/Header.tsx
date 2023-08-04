import { Link } from "react-router-dom";

import ZoomIcon from "assets/icons/zoom.svg";

import { ROUTES } from "constants/routes";

import styles from "./header.module.scss";

const Header = () => (
  <div className={styles.wrapper}>
    <Link to={ROUTES.home}>
      <ZoomIcon />
    </Link>
  </div>
);

export default Header;
