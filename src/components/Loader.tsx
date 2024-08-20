"use client";

import React from "react";
import "../app/Assets/style/login.css";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader rounded-full  flex justify-center items-center w-[100px] h-[100px] relative">
        <div
          className="w-[95px] h-[95px]  absolute flex justify-center items-center z-50 bg-black"
          style={{ borderRadius: "50%" }}
        >
          <img src="/images/loader.png" className="w-[95px] h-[95px]" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
