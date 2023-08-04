import LoaderIcon from "assets/icons/loader.svg";

import styles from "./loader.module.scss";

const Loader = () => (
  <div className={styles.wrapper}>
    <LoaderIcon />
  </div>
);

export default Loader;
