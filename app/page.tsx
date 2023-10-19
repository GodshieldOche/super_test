"use client";
import Progress from "@/components/Common/Progress";
import Intitial from "@/components/Screens/Intitial";
import Password from "@/components/Screens/Password";
import Review from "@/components/Screens/Review";
import { RegisterContext } from "@/context/registerContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export type Counrty = {
  name: {
    common: string;
  };
};

export default function RegisterPage() {
  const [countries, setCountries] = useState<Counrty[]>([]);
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step")) || 0;
  const { data } = useContext(RegisterContext);
  const router = useRouter();

  const unloadListerner = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";

    const message =
      "Are you sure you want to leave? Your changes may not be saved.";

    e.returnValue = message;
    return message;
  };

  // Prevent window reload reload or exit
  useEffect(() => {
    window.addEventListener("beforeunload", unloadListerner);

    return () => {
      window.removeEventListener("beforeunload", unloadListerner);
    };
  }, []);

  // Get list of countries on Component mount
  useEffect(() => {
    (async () => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data: Counrty[] = await res.json();
      setCountries(
        data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1))
      );
    })();
  }, []);

  // When last step loads, redirect to first step if any required field is empty
  useEffect(() => {
    if (step === 1 || step === 0) {
      return;
    }
    const isAnyEmpty = Object.keys(data).find(
      (key) => !data[key as keyof typeof data]
    );
    if (isAnyEmpty) {
      router.push("/");
    }
  }, [step]);

  // Redender step title
  const renderTitle = () => {
    if (step === 0) {
      return "Initial info";
    } else if (step === 1) {
      return "Password screen";
    } else {
      return "Review screen";
    }
  };

  // remder step view/screen
  const renderStepView = () => {
    if (step === 0) {
      return <Intitial countries={countries} />;
    } else if (step === 1) {
      return <Password />;
    } else {
      return <Review />;
    }
  };

  return (
    <main className="w-full flex relative flex-col gap-y-[60px] justify-center items-center ">
      <div className="flex flex-col justify-center items-center gap-y-4 ">
        <h1 className="text-4xl font-medium text-primaryOne ">
          Super test form
        </h1>
        <h3 className="text-xl text-primaryTwo ">{renderTitle()}</h3>
      </div>

      <div className="w-[400px] py-10 px-5 rounded-[20px] bg-primaryTwo">
        {renderStepView()}
      </div>

      <Progress step={step} />
    </main>
  );
}
