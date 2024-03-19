import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";
import { Selector } from "@/reusables";

import { useCreateForm } from "@/hooks/useCreateForm";

const Output = () => {
  const { output } = useCreateForm();

  return (
    <div className={styles["container"]}>
      <p className={textStyles["headline-small-bold"]}>Result</p>

      <div className={styles["content"]}>
        <pre>{JSON.stringify(output, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Output;
