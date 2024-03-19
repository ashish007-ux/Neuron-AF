import React from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";
import { iconPath } from "@/icons";
const FilledButton = ({
  icon,
  label,
  state = "enabled",
  type = "primary",
  width = "fit-content",
  ...otherProps
}) => {
  return (
    <div
      className={`${styles["container"]} ${styles[state]} ${styles[type]}`}
      style={{ width: width }}
      {...otherProps}
    >
      {icon && <img src={iconPath(icon)} className={styles[`icon-${state}`]} />}
      <p className={textStyles["label-large"]}>{label}</p>
    </div>
  );
};

export default FilledButton;
