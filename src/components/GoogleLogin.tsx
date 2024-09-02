"use client";
import React, { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { baseURL } from "@/Constants/constants";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLoginBtn: React.FC = () => {
  const router = useRouter(); 

  const handleGoogleResponse = async (response: any) => {
    try {
      const res = await fetch(`${baseURL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      if (res.ok) {
        // Redirect to dashboard or any other page
        router.push("/");
      } else {
        alert("Login failed");
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  // useEffect(() => {
  //   const initializeGoogleSignIn = () => {
  //     if (window.google) {
  //       window.google.accounts.id.initialize({
  //         client_id:
  //           "240091052176-v86vgp09ptl1qopbrovi1kemosjn3tb9.apps.googleusercontent.com",
  //         callback: handleGoogleResponse,
  //       });

  //       window.google.accounts.id.renderButton(
  //         document.getElementById("google-login-btn"),
  //         {
  //           type: "standard",
  //           theme: "filled_black",
  //           size: "large",
  //           text: "signin_with",
  //           shape: "pill",
  //         }
  //       );

  //       window.google.accounts.id.prompt();
  //     }
  //   };

  //   if (window.google) {
  //     initializeGoogleSignIn();
  //   }
  // }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => {
          if (window.google) {
            window.google.accounts.id.initialize({
              client_id:
                "240091052176-v86vgp09ptl1qopbrovi1kemosjn3tb9.apps.googleusercontent.com",
              callback: handleGoogleResponse,
            });

            window.google.accounts.id.renderButton(
              document.getElementById("google-login-btn"),
              {
                type: "standard",
                theme: "filled_black",
                size: "large",
                text: "signin_with",
                shape: "pill",
              }
            );

            window.google.accounts.id.prompt();
          }
        }}
      />
      <div onClick={handleGoogleResponse} id="google-login-btn"></div>
    </>
  );
};

export default GoogleLoginBtn;
