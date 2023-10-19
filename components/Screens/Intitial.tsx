"use client";
import React, { useContext } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Input from "../Formik/Input";
import Button from "../Common/Button";
import Dropdown from "../Formik/Dropdown";
import { useRouter } from "next/navigation";
import { RegisterContext } from "@/context/registerContext";
import { Counrty } from "@/app/page";

const intialInfoSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is incorrect")
    .required("This field is required."),
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(12, "Username must be at most 12 characters long")
    .trim()
    .required("This field is required."),
  phone_number: yup
    .string()
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Invalid phone number")
    .required("This field is required."),
  country: yup.string().required("This field is required."),
});

interface intialInfoValues {
  email: string;
  username: string;
  phone_number: string;
  country: string;
}

const Intitial: React.FC<{ countries: Counrty[] }> = ({ countries }) => {
  const {
    data: { email, username, phone_number, country },
    setData,
  } = useContext(RegisterContext);
  const initialValues: intialInfoValues = {
    email,
    username,
    phone_number,
    country,
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={intialInfoSchema}
      onSubmit={(values, { setSubmitting }) => {
        setData(
          (prev) =>
            (prev = {
              ...prev,
              ...values,
            })
        );
        router.push("?step=1");
        setSubmitting(false);
      }}
      validateOnMount
    >
      {({
        errors,
        touched,
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        isValid,
      }) => (
        <Form autoComplete="off" className="space-y-10">
          <Input
            label="Username"
            name="username"
            type="text"
            value={values.username}
            handleChange={handleChange}
            placeholder="Input username"
            handleBlur={handleBlur}
            error={errors.username}
            touched={touched.username}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            handleChange={handleChange}
            placeholder="Input email"
            handleBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <Input
            label="Phone Number"
            name="phone_number"
            type="tel"
            value={values.phone_number}
            handleChange={handleChange}
            placeholder="e.g +1234567890"
            handleBlur={handleBlur}
            error={errors.phone_number}
            touched={touched.phone_number}
          />

          <Dropdown
            label="Country"
            name="country"
            value={values.country}
            handleChange={setFieldValue}
            placeholder="Select Country"
            handleBlur={setFieldTouched}
            error={errors.country}
            touched={touched.country}
            options={countries?.map((country) => ({
              label: country.name.common,
              value: country.name.common,
            }))}
          />
          <Button
            text="Continue"
            disabled={!isValid || isSubmitting}
            action={handleSubmit}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Intitial;
