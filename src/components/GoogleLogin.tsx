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

const GoogleLoginBtn: React.FC<any> = (inviteId: string) => {
  const router = useRouter();

  const handleGoogleResponse = async (response: any) => {
    // try {
    //   const res = await fetch(`${baseURL}/auth/google/callback`, {
    //     method: "get",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     // body: JSON.stringify({ credential: response.credential }),
    //   });

    //   if (res.ok) {
    //     // Redirect to dashboard or any other page
    //     router.push("/");
    //   } else {
    //     alert("Login failed");
    //   }
    // } catch (err: any) {
    //   alert(`Error: ${err.message}`);
    // }

    window.location.href = `${baseURL}/auth/google/callback`;

    // window.open(`${baseURL}/auth/google/callback`,'_self')
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
      <button onClick={handleGoogleResponse} className="gsi-material-button">
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              style={{ display: "block" }}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents">
            Sign in with Google
          </span>
          <span style={{ display: "none" }}>Sign in with Google</span>
        </div>
      </button>
    </>
  );
};

export default GoogleLoginBtn;

// "use client";
// import { signIn, signOut, useSession, getSession } from "next-auth/react";
// import "../app/Assets/style/login.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { baseURL } from "@/Constants/constants";

// interface GoogleLoginBtnProps {
//   inviteId: string | null;
// }

// const GoogleLoginBtn:React.FC<GoogleLoginBtnProps> = (inviteId ) => {
//   const { data: session } = useSession();
//   console.log(inviteId)

//   console.log(session)

//   const [loading, setLoading] = useState(false);

//   const handleGoogleLogin = async () => {
//     setLoading(true);

//     try {
//       // Prevent automatic redirect after sign-in
//       const result = await signIn("google", { redirect: false });
//       console.log("Sign-in result:", result); // Log the result to debug

//       if (result==undefined) {
//         // Fetch the session data to get the user details
//         const sessionData = await getSession();
//         console.log("Session data after sign-in:", sessionData);

//         if (sessionData) {
//           // Manually authenticate with your backend using sessionData and inviteId
//           try {
//             const response = await axios.post(
//               "http://localhost:4000/login",
//               {
//                 googleId: sessionData.user.id,
//                 email: sessionData.user.email,
//                 name: sessionData.user.name,
//                 image: sessionData.user.image,
//                 inviteId: inviteId, // Send inviteId only if it exists
//               },
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${sessionData?.user}`, // Use the token from sessionData if available
//                 },
//               }
//             );

//             console.log("Backend response:", response.data);

//             // If backend authentication is successful, redirect to home or another page
//             if (response.status === 200) {
//               window.location.href = "/home"; // Manually redirect to the desired page
//             }
//           } catch (error) {
//             console.error("Error sending data to backend:", error);
//           }
//         }
//       } else {
//         console.error("Google sign-in failed:", result?.error);
//       }
//     } catch (error) {
//       console.error("Error during sign-in process:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       {!session ? (
//         <button
//           onClick={handleGoogleLogin}
//           className="gsi-material-button"
//         >
//           <div className="gsi-material-button-state"></div>
//           <div className="gsi-material-button-content-wrapper">
//             <div className="gsi-material-button-icon">
//               <svg
//                 version="1.1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 48 48"
//                 style={{ display: "block" }}
//               >
//                 <path
//                   fill="#EA4335"
//                   d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
//                 ></path>
//                 <path
//                   fill="#4285F4"
//                   d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
//                 ></path>
//                 <path
//                   fill="#FBBC05"
//                   d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
//                 ></path>
//                 <path
//                   fill="#34A853"
//                   d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
//                 ></path>
//                 <path fill="none" d="M0 0h48v48H0z"></path>
//               </svg>
//             </div>
//             <span className="gsi-material-button-contents">
//               Sign in with Google
//             </span>
//             <span style={{ display: "none" }}>Sign in with Google</span>
//           </div>
//         </button>
//       ) : (
//         <>
//           <p>Welcome, {session.user?.name}</p>
//           <button
//             onClick={() => signOut()}
//             className="google-logout-button text-white"
//           >
//             Sign out
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default GoogleLoginBtn;
