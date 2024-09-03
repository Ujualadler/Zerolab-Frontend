"use client";

import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
// import MapShow from "@/components/Map";
import React from "react";
const MapShow = dynamic(() => import("../components/Map"), {
  ssr: false,
});

// const GoogleLoginBtn = dynamic(() => import("../components/GoogleLogin"), {
//   ssr: false,
// });

const Page: React.FC = () => {
  return (
    <Layout>
      <MapShow />
    </Layout>
  );
};

export default Page;
