import React from "react";
import { ErrorMessage, Field } from "formik";
import { ErrorSvg } from "../Common/svgs";

interface Props {
  label: string;
  name: string;
  value: string | number;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  error: string | undefined;
  touched: boolean | undefined;
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  disabled?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  name,
  placeholder,
  error,
  type,
  touched,
  value,
  handleChange,
  handleBlur,
  disabled,
}) => {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor={name}>
        <h3 className="label">{label}</h3>
      </label>
      <div className="relative w-full h-fit">
        <Field
          id={name}
          name={name}
          type={type}
          value={value}
          className="input"
          onChange={handleChange}
          aria-autocomplete="none"
          disabled={disabled}
          placeholder={placeholder}
          onBlur={handleBlur}
        />
        {touched && error && (
          <div className="absolute top-0 bottom-0 right-0 flex justify-center items-center pr-4">
            <ErrorSvg />
          </div>
        )}
      </div>

      <ErrorMessage
        className="text-sm font-medium text-error"
        name={name}
        component="div"
      />
    </div>
  );
};

export default Input;
