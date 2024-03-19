
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";
import { Selector } from "@/reusables";

import { useCreateForm } from "@/hooks/useCreateForm";

const Configuration = () => {
  const { form, setForm, data } = useCreateForm();
  const [channels, setChannels] = useState([]);
  const metrics = [
    "tx_estimated_bw_kbps",
    "rx_estimated_bw_kbps",
    "wan_circuit_tx_cir_kbps",
    "wan_circuit_rx_cir_kbps",
    "tx_kbps",
    "rx_kbps",
  ];
  // const [filteredMetrics, setFilteredMetrics] = useState([]);

  const currentTime = new Date("2024-03-08 22:38:00.000 +0530");

  const filteredData = data?.filter((entry) => {
    const entryTimestamp = new Date(entry.ec_timestamp);
    const timeDifference = Math.abs(currentTime - entryTimestamp) / (1000 * 60); // Time difference in minutes
    if (timeDifference <= 10) {
      const changedMetrics = Object.keys(entry).filter(
        (key) =>
          key !== "channel_id" &&
          key !== "ec_timestamp" &&
          entry[key] !== data[data.length - 1][key]
      );
      return changedMetrics.length > 0;
    }
    return false;
  });
  // filtered data
  // console.log(filteredData);
  const filterChannel = () => {
    const uniqueChannelIds = new Set();
    filteredData?.forEach((entry) => {
      uniqueChannelIds.add(entry.channel_id);
    });
    const uniqueChannelIdsArray = Array.from(uniqueChannelIds);
    console.log(uniqueChannelIdsArray);
    setChannels(uniqueChannelIdsArray);
  };

  useEffect(() => {
    filterChannel();
  }, [data]);

  return (
    <div className={styles["container"]}>
      {data ? (
        <>
          <p className={textStyles["headline-small-bold"]}>
            Select Configuration
          </p>

          <div className={styles["field"]}>
            <p
              className={`${styles["label"]} ${textStyles["body-large-bold"]}`}
            >
              Channel
            </p>
            <Selector
              variant="single"
              name="channel"
              placeholder="Select channel"
              state={form.channel.error ? "error" : "enabled"}
              selected={form.channel.value}
              list={channels}
              handleSelectMenuItem={(item) => {
                setForm({
                  ...form,
                  channel: { ...form["channel"], value: item },
                });
              }}
              menuHeight="150px"
              width="605px"
              id="tagMenu"
            />
          </div>

          <div className={styles["field"]}>
            <p
              className={`${styles["label"]} ${textStyles["body-large-bold"]}`}
            >
              Select Metrics
            </p>
            <Selector
              variant="single"
              name="metrics"
              placeholder="Select metrics"
              state={form.metrics.error ? "error" : "enabled"}
              selected={form.metrics.value}
              list={metrics}
              handleSelectMenuItem={(item) => {
                setForm({
                  ...form,
                  metrics: { ...form["metrics"], value: item },
                });
              }}
              menuHeight="150px"
              width="605px"
              id="tagMenu"
            />
          </div>
        </>
      ) : (
        <h1 className="center">Loading...</h1>
      )}
    </div>
  );
};
export default Configuration;
