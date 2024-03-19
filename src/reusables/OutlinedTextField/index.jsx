import React, { useState } from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";

import { iconPath } from "@/icons";

const OutlinedTextField = ({
  width = "100%",
  type,
  state = "enabled",
  leadingIcon,
  trailingIcon,
  label,
  supportingText,
  value,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelClass =
    isFocused || value
      ? state == "error"
        ? `${textStyles["body-small"]} ${styles["label-focused"]} ${styles["error"]}`
        : `${textStyles["body-small"]} ${styles["label-focused"]} ${styles["focus"]}`
      : `${textStyles["body-large"]} ${styles["label"]} ${styles[state]}`;

  const supportingTextClass = `${textStyles["body-small"]} ${styles["supporting-text"]} ${styles[state]}`;

  const containerClass = isFocused
    ? state == "error"
      ? `${styles["container"]} ${styles["container-error"]}`
      : `${styles["container"]} ${styles["container-focus"]}`
    : `${styles["container"]} ${styles["container-" + state]}`;

  return (
    <div className={styles["text-field"]} style={{ width: width }}>
      <div className={styles["input-field"]}>
        <div className={containerClass}>
          {leadingIcon && (
            <img
              className={styles["icon"]}
              src={iconPath(leadingIcon.icon)}
              style={{ marginLeft: "12px" }}
            />
          )}
          <input
            className={
              state == "disabled"
                ? `${styles["input"]} ${styles[state]}`
                : `${styles["input"]} `
            }
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            disabled={state == "disabled" ? true : false}
            autoComplete="off"
            spellCheck="false"
            {...otherProps}
          />
          {(trailingIcon || state == "error") && (
            <img
              className={styles["icon"]}
              src={
                state == "error"
                  ? iconPath("error")
                  : iconPath(trailingIcon.icon)
              }
              style={
                button
                  ? { cursor: "pointer", marginRight: "2px" }
                  : { cursor: "pointer", marginRight: "12px" }
              }
              onClick={state == "error" ? () => {} : trailingIcon?.action}
            />
          )}
        </div>
        <p
          className={
            state == "disabled" ? styles["label-disabled"] : labelClass
          }
          style={leadingIcon ? { marginLeft: "52px" } : { marginLeft: "16px" }}
        >
          {label}
        </p>
      </div>
      <p className={supportingTextClass}>{supportingText}</p>
    </div>
  );
};

export default OutlinedTextField;
