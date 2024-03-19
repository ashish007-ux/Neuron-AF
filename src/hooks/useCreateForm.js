
import { createContext, useContext, useState } from "react";

// import { data } from "@/data";
import { filterDataByChannelId } from "@/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";



const CreateFormContext = createContext();

export const useCreateForm = () => {
  const context = useContext(CreateFormContext);



  if (!context) {
    throw new Error(
      "useCreateForm must be used within a CreateFormProvider"
    );
  }

  return context;
};

export const CreateFormProvider = ({ children }) => {
   
  const [output, setOutput] = useState({});


  const [form, setForm] = useState({
    duration: { value: "", error: false, supporting: "" },
    channel: { value: "", error: false, supporting: "" },
    metrics: { value: "", error: false, supporting: "" },
    label: { value: "", error: false, supporting: "" },
    current: 0,
  });

  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbws9NzjnlDd7VDcizPS3cSojL6WuJl49QuwY05gOewS43ii5HcXNDgZgyFkFPYKtg_t/exec?action=getdata')
      .then((res) => res.json()
      )
      .then((data) => {
      
        setData(data)
      })
    
  }, [])



  const [metrics, setMetrics] = useState(data);



  const router = useRouter();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: {
        ...prevForm[name],
        value: value,
      },
    }));
  };

  const generateOutput = () => {
    const res = {
      ...output,
      channel: form.channel.value,
      tag:form.label.value
      // metrics: [{
      //   // "metric_name": form.metrics.value,
      //   "tag": form.label.value,
      //   // "from_timestamp": data[0]["ec_timestamp"],
      //   // "to_timestamp": data[data.length - 1]["ec_timestamp"],
      // },
      // ],
    }
    setOutput(res);
  }


  const actions = [
    {
      back: () => {
        router.push("/");
      },
      next: () => {
        const res = filterDataByChannelId(data, form.channel.value);
        console.log(res);
        setMetrics(res)
        setForm({ ...form, current: 1 });
      },
    },
    {
      back: () => {
        setForm({ ...form, current: 0 });
      },
      next: () => {
        generateOutput();
        setForm({ ...form, current: 2 });
      },
    },
    {
      back: () => {
        setForm({ ...form, current: 1 });
      },
      next: () => {
        router.push("/");
      },
    },
  ];


  return (
    <CreateFormContext.Provider
      value={{
        actions,
        form,
        metrics,
        output,
        data,
        handleChange,
        setForm,
        setOutput,
        
      }}
    >
      {children}
    </CreateFormContext.Provider>
  );
};
