import React from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";
import { Chart, OutlinedTextField } from "@/reusables";
import { useCreateForm } from "@/hooks/useCreateForm";
import { useState } from "react";

const Metrics = () => {
  const { form, metrics, handleChange } = useCreateForm();
  


  return (
    <div className="main">
      <Chart
        label={`${form.channel.value}-${form.metrics.value}`}
        data={metrics}
        dataKey={form.metrics.value}

      />

      <div className={styles["field"]}>
        <p className={`${styles["label"]} ${textStyles["body-large-bold"]}`}>
          Label
        </p>
        <OutlinedTextField
          name="label"
          placeholder="Enter your custom comment here"
          state={form.label.error ? "error" : "enabled"}
          value={form.label.value}
          supportingText={form.label.supporting}
          onChange={handleChange}
          width="605px"
        />
      </div>
    </div>
  );
};

export default Metrics;
