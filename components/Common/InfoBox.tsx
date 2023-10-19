import React from "react";

interface Props {
  name: string;
  value: string;
}

const InfoBox: React.FC<Props> = ({ name, value }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-secondaryThree text-sm ">{name}</h3>
      <h3 className="text-sm text-white font-medium ">{value}</h3>
    </div>
  );
};

export default InfoBox;
