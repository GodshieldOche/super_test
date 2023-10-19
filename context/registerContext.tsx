"use client";
import React, { useState, createContext } from "react";

type RegisterData = {
  username: string;
  email: string;
  phone_number: string;
  country: string;
  password: string;
};

type registerProps = {
  data: RegisterData;
  setData: React.Dispatch<React.SetStateAction<RegisterData>>;
};

const initialValues = {
  username: "",
  country: "",
  email: "",
  password: "",
  phone_number: "",
};

export const RegisterContext = createContext<registerProps>({
  data: initialValues,
  setData: () => {
    // do nothing.
  },
});

const RegisterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<RegisterData>(initialValues);

  return (
    <RegisterContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;
