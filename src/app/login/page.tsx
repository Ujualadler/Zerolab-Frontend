'use client'

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "../Assets/style/login.css";
import { useRouter, useSearchParams } from "next/navigation";

const GoogleLoginBtn = dynamic(() => import("../../components/GoogleLogin"), {
  ssr: false,
});

const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteId = searchParams.get('inviteId');  // Extract inviteId from the URL query parameters
  const [invite, setInvite] = useState<string | null>(null);

  console.log(inviteId)

  useEffect(() => {
    if (typeof inviteId === 'string') {
      setInvite(inviteId);
    }
  }, [inviteId]);
  return (
    <div className="bg-black flex justify-center items-center">
      <div className="min-h-[100vh] w-[100vw] flex justify-center items-center  bg-no-repeat bg-bottom  ">
        <div className="animation md:w-[400px] sm:w-[400px] w-[90%]  h-[250px] p-3 flex justify-center items-center bg-black">
          <div className="absolute z-100 flex flex-col justify-center items-center  backdrop-blur-sm  rounded-[20px] bg-black border-gray-100   font-bold text-2xl m-4   w-[99%] h-[98.5%] ">
            <div className="flex items-center gap-4 mb-8">
              <img src="/images/logozero.png" className="w-10 h-10" />
              <h2 className="text-white tracking-widest sm:text-4xl text-3xl text-center font-medium">
                Zerolab.ai
              </h2>
            </div>
            <div className="w-[250px]">
              <GoogleLoginBtn />
            </div>
          </div>

          <div className="bg"></div>

          <div className="star-field">
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
