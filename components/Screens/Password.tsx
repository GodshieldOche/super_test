"use client";
import React, { useContext } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Input from "../Formik/Input";
import Button from "../Common/Button";
import { useRouter } from "next/navigation";
import { RegisterContext } from "@/context/registerContext";

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password must be at most 16 characters long"),
  confirmPassword: yup
    .string()
    .required("This field is required.")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface passwordValue {
  password: string;
  confirmPassword: string;
}

const Password = () => {
  const {
    data: { password },
    setData,
  } = useContext(RegisterContext);
  const initialValues: passwordValue = {
    password,
    confirmPassword: password,
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordSchema}
      onSubmit={({ password }, { setSubmitting }) => {
        setData(
          (prev) =>
            (prev = {
              ...prev,
              password,
            })
        );
        router.push("?step=3");
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
        isValid,
      }) => (
        <Form autoComplete="off" className="space-y-10">
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            handleChange={handleChange}
            placeholder="Input password"
            handleBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
          <Input
            label="Repeat password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            handleChange={handleChange}
            placeholder="Repeat password"
            handleBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
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

export default Password;
