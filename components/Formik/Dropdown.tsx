import { ErrorMessage } from "formik";
import { Inter } from "next/font/google";
import React from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import { DownChevron, UpCheveron } from "../Common/svgs";

const inter = Inter({ subsets: ["latin"] });

type Option = {
  value: string;
  label: string;
};

interface Props {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  handleChange: any;
  error: string | undefined;
  touched: boolean | undefined;
  handleBlur: any;
  options: Option[];
  disabled?: boolean;
}

const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.isFocused ? <UpCheveron /> : <DownChevron />}
    </components.DropdownIndicator>
  );
};

const Dropdown: React.FC<Props> = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  options,
  placeholder,
}) => {
  return (
    <div className="w-full space-y-2">
      <label htmlFor={name}>
        <h3 className="label">{label}</h3>
      </label>
      <Select
        options={options}
        className="w-full"
        placeholder={placeholder}
        styles={{
          placeholder: (styles) => ({
            ...styles,
            color: "#C0BCDF",
            ...inter.style,
          }),
          indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
          indicatorsContainer: (styles) => ({ ...styles }),
          dropdownIndicator: (styles) => ({
            ...styles,
            padding: "0px",
            paddingRight: "12px",
          }),
          valueContainer: (styles) => ({
            ...styles,
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingLeft: "16px",
            fontSize: "14px",
            ...inter.style,
          }),
          input: (styles) => ({
            ...styles,
            padding: 0,
            margin: 0,
            caretColor: "white",
            ...inter.style,
          }),
          control: (styles) => ({
            ...styles,
            borderRadius: "0px",
            boxShadow: "none",
            border: "none",
            height: "44px",
            ...inter.style,
          }),
          option: (styles, { isSelected }) => ({
            ...styles,
            fontSize: "14px",
            color: "#413C5F",
            backgroundColor: isSelected ? "#F6F4FF" : undefined,
            display: "flex",
            columnGap: "8px",
            alignItems: "center",
            ...inter.style,
            fontWeight: isSelected ? 600 : 400,
            ":hover": {
              ...styles[":active"],
              backgroundColor: "#F6F4FF",
            },
            "::after": {
              content: isSelected ? 'url("/checked.svg")' : '""',
              height: "16px",
            },
          }),
          menu: (styles) => ({ ...styles, borderRadius: "0px" }),
        }}
        value={options.find((option) => option.value === value)}
        onChange={(e) => handleChange(name, e?.value)}
        onBlur={() => handleBlur(name, true)}
        components={{
          DropdownIndicator,
        }}
      />
      <ErrorMessage
        className="text-sm font-medium text-error"
        name={name}
        component="div"
      />
    </div>
  );
};

export default Dropdown;
