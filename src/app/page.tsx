"use client";

import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
// import MapShow from "@/components/Map";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MapShow = dynamic(() => import("../components/Map"), {
  ssr: false,
});

// const GoogleLoginBtn = dynamic(() => import("../components/GoogleLogin"), {
//   ssr: false,
// });

const Page: React.FC = () => {

  const notify = (message: string) => toast(message);

  

  return (
    <Layout>
      <ToastContainer />
      <MapShow />
    </Layout>
  );
};

export default Page;
