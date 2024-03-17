"use client";
import React, { useState, useEffect } from "react";
import { Heading } from "@/components/ui/heading";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/context/userContext";
import { Repeat } from "lucide-react";

const Page = () => {
  const { userData } = useUser();
  const [data, setData] = useState({
    performance: 0,
  });

  const [loading, setLoading] = useState(false);

  const getStats = async () => {
    const website = userData.companyWebsite;
    console.log(website);
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${website}&key=AIzaSyAYQp12AIJQRRbjth08OlIWcX4cfISocsY`
      );
      setData({
        performance: res.data.lighthouseResult.categories.performance.score,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-fit overflow-y-auto">
      <div className="flex justify-between">
        <Heading
          title={`Website Stats`}
          description="View your website stats"
        />
        <div>
          <button className="bg-white text-black flex gap-2 rounded-md p-2">
            {" "}
            <Repeat size={20} />{" "}
            <span className="text-sm"> Last Updated @ 9:00 OM</span>{" "}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4 gap-4 pt-3">
        {/* <div>
          <Progress value={data.performance * 100} />
        </div> */}

        <div className="border-[1px] border-gray-500  text-white p-2 rounded-md w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-gray-200">Performance</span>
            <span className="bg-green-400 text-green-800 px-2 rounded-full">
              {" "}
              Best{" "}
            </span>
          </div>

          <div className="text-4xl">47%</div>

          <div>
            <Progress value={47} />
          </div>
        </div>
        <div className="border-[1px] border-gray-500  text-white p-2 rounded-md w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-gray-200">Accessiblity</span>
            <span className="bg-green-400 text-green-800 px-2 rounded-full">
              {" "}
              Best{" "}
            </span>
          </div>

          <div className="text-4xl">47%</div>

          <div>
            <Progress value={47} />
          </div>
        </div>
        <div className="border-[1px] border-gray-500  text-white p-2 rounded-md w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-gray-200">SEO</span>
            <span className="bg-green-400 text-green-800 px-2 rounded-full">
              {" "}
              Best{" "}
            </span>
          </div>

          <div className="text-4xl">47%</div>

          <div>
            <Progress value={47} />
          </div>
        </div>
        <div className="border-[1px] border-gray-500  text-white p-2 rounded-md w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-gray-200">Best Practices</span>
            <span className="bg-green-400 text-green-800 px-2 rounded-full">
              {" "}
              Best{" "}
            </span>
          </div>

          <div className="text-4xl">47%</div>

          <div>
            <Progress value={47} />
          </div>
        </div>
      </div>

      <div className=" text-white p-2 rounded-md w-full flex flex-col gap-4 pt-3">
        <div className="flex justify-between">
          <span className="text-gray-200 text-2xl">Performance</span>
          <span className="bg-green-400 text-green-800 px-2 rounded-full">
            {" "}
            Best{" "}
          </span>
        </div>

        <div className="text-4xl">47%</div>

        <div>
          <Progress value={98} />
        </div>
      </div>

      <div className="pt-10">
        <div className="text-2xl">Matrics</div>
        <div className="border-gray-300 border-[1px] flex gap-10 justify-around py-5 rounded-lg px-10">
          <div className="w-1/2 flex flex-col gap-3">
            <div className="w-full flex justify-between">
              <span> First Contentful Paint </span>
              <span className="text-green-500"> 1.0s </span>
            </div>
            <div className="w-full flex justify-between">
              <span> Speed index </span>
              <span className="text-green-500"> 1.0s </span>
            </div>
            <div className="w-full flex justify-between">
              <span> Time Interactive </span>
              <span className="text-green-500"> 3.0s </span>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-3">
            <div className="w-full flex justify-between">
              <span> First Meaning Paint </span>
              <span className="text-yellow-500"> 2.0s </span>
            </div>
            <div className="w-full flex justify-between">
              <span> First CPU Idle </span>
              <span className="text-green-500"> 2.4s </span>
            </div>
            <div className="w-full flex justify-between">
              <span>Max potential First Input Delay </span>
              <span className="text-red-500"> 2000ms </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
