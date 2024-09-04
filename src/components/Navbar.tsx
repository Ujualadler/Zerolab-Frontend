"use client"; // Ensure this is at the top of the file
import { useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const router = useRouter();

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="flex sticky justify-between items-center p-1 bg-gradient-to-b from-[#011719] shadow-2xl bg-opacity-0 backdrop-blur-sm w-[98vw] z-10 top-0">
      <div className="flex items-center gap-2">
      <img src="/images/logozero.png" className="h-8 w-8 ml-4 my-3" />
      <div><h4 className="text-white text-sm">Beta V 1.3</h4></div>
      </div>
      <div
        onClick={handleProfile}
        className="h-9 w-9 rounded-[50%]"
        style={{ border: "3px solid #80FF00" }}
      >
        <img
          src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/mock/assets/images/avatar/avatar-25.webp"
          className="w-[100%] h-[100%] rounded-[50%]"
        />
      </div>
    </div>
  );
}

export default Navbar;
