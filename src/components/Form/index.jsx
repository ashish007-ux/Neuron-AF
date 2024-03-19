import React from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";

import { useCreateForm } from "@/hooks/useCreateForm";
import { FilledButton } from "@/reusables";
import { Configuration, Metrics, Output } from "./components";

const Form = () => {
  const { form, actions } = useCreateForm();

  const router = useRouter();

  return (
    <>
      <div className={styles["container"]}>
        {form.current == 0 && <Configuration />}
        {form.current == 1 && <Metrics />}
        {form.current == 2 && <Output />}

        {/**Actions */}
        <div className={styles["action-buttons"]}>
          <FilledButton
            label="Back"
            icon="tab-left"
            width="96px"
            onClick={actions[form.current].back}
          />
          <FilledButton
            label={form.current == 2 ? "Retry" : "Next"}
            icon="tab-right"
            width="96px"
            onClick={actions[form.current].next}
          />
        </div>
      </div>
    </>
  );
};

export default Form;
