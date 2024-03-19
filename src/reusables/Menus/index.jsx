import React from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";
import { iconPath } from "@/icons";
import Link from "next/link";

const Menus = ({ list, handleSelectMenuItem, width, height }) => {
  return (
    <div
      className={styles["container"]}
      style={{ width: width, maxHeight: height }}
    >
      {list.map((item, i) => {
        if (item.path) {
          return (
            <Link href={item.path || ""} key={i}>
              <div
                className={styles["option"]}
                onClick={
                  handleSelectMenuItem
                    ? () => {
                        handleSelectMenuItem(item, i);
                      }
                    : () => {}
                }
              >
                {item.icon && (
                  <img className={styles["icon"]} src={iconPath(item.icon)} />
                )}
                {item.label && <p>{item.label}</p>}
                {!item.icon && item && <p>{item}</p>}
              </div>
            </Link>
          );
        } else {
          return (
            <div
              key={i}
              className={styles["option"]}
              onClick={
                handleSelectMenuItem
                  ? () => {
                      handleSelectMenuItem(item, i);
                    }
                  : () => {}
              }
            >
              {item.icon && (
                <img className={styles["icon"]} src={iconPath(item.icon)} />
              )}
              {item.label && <p>{item.label}</p>}
              {!item.icon && item && <p>{item}</p>}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Menus;
