import React from "react";

import styles from "@/styles/Home.module.css";
import textStyles from "@/styles/Typography.module.css";

import { CreateFormProvider } from "@/hooks/useCreateForm";

import Form from "@/components/Form";

const index = () => {
  return (
   
      
        <div className={styles["container"]}>
          {/**Header */}
          <div className={styles["header"]}>
            <h3 className={textStyles["headline-medium-bold"]}>Neuron UI Assignment</h3>
          </div>
          {/**Form */}
          <CreateFormProvider>
            <Form />
          </CreateFormProvider>
        </div>
   
    
  );
};

export default index;
