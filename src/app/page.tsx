"use client";

import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import MapShow from "@/components/Map";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import React from "react";

const GoogleLoginBtn = dynamic(() => import("../components/GoogleLogin"), {
  ssr: false,
});

const Page: React.FC = () => {
  return (
    <Layout>
      <MapShow />
    </Layout>
  );
};

export default Page;
