import React, { useContext } from "react";
import Button from "../Common/Button";
import InfoBox from "../Common/InfoBox";
import { RegisterContext } from "@/context/registerContext";

const Review = () => {
  const { data } = useContext(RegisterContext);
  return (
    <div className="w-full flex flex-col gap-y-10">
      <div className="space-y-6">
        <InfoBox name="Username" value={data.username} />
        <InfoBox name="Phone Number" value={data.phone_number} />
        <InfoBox name="Country" value={data.country} />
      </div>
      <Button text="Complete" action={() => ""} />
    </div>
  );
};

export default Review;
