import React from "react";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ text, action, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={action}
      className="py-4 w-full text-2xl leading-normal rounded text-primaryOne bg-white disabled:text-secondaryTwo disabled:bg-disabled "
    >
      {text}
    </button>
  );
};

export default Button;
