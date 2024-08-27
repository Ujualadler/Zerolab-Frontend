// "use client";

// import { Box, Typography } from "@mui/material";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// interface FormField {
//   type: string;
//   label: string;
//   options?: string[];
//   ratingValue?: number;
// }

// interface Form {
//   _id: string;
//   title: string;
//   fields: FormField[];
// }

// function Page() {
//   const params = useParams();
//   const id = params.id;
//   const [form, setForm] = useState<Form | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [ratingValues, setRatingValues] = useState<{ [key: number]: number }>(
//     {}
//   );
//   const [copySuccess, setCopySuccess] = useState<string>("");

//   useEffect(() => {
//     if (id) {
//       const fetchForm = async () => {
//         try {
//           const response = await axios.get(`http://localhost:4000/form/${id}`);
//           setForm(response.data);
//           setLoading(false);
//         } catch (error) {
//           setError("Error fetching form data");
//           setLoading(false);
//         }
//       };

//       fetchForm();
//     }
//   }, [id]);

//   const renderField = (field: FormField, index: number) => {
//     switch (field.type) {
//       case "text":
//         return (
//           <input
//             type="text"
//             placeholder="Text input"
//             className="p-2 rounded-sm bg-[#2a2b2f] mt-2 text-white w-full"
//           />
//         );
//       case "select":
//         return (
//           <select className="p-2 rounded-sm bg-[#2a2b2f] mt-2 text-white w-full">
//             {field.options?.map((option, idx) => (
//               <option key={idx} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         );
//       case "checkbox":
//         return (
//           <div className="mt-2">
//             {field.options?.map((option, idx) => (
//               <label key={idx} className="flex items-center text-white">
//                 <input type="checkbox" className="mr-2 text-white" />
//                 {option}
//               </label>
//             ))}
//           </div>
//         );
//       case "radio":
//         return (
//           <div className="mt-2">
//             {field.options?.map((option, idx) => (
//               <label key={idx} className="flex items-center text-white">
//                 <input
//                   type="radio"
//                   name={`radio-${index}`}
//                   className="mr-2 text-white"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         );
//       case "yesno":
//         return (
//           <div className="flex gap-4 mt-2">
//             <label className="flex items-center text-white">
//               <input
//                 type="radio"
//                 name={`yesno-${index}`}
//                 value="yes"
//                 className="mr-2"
//               />
//               Yes
//             </label>
//             <label className="flex items-center text-white">
//               <input
//                 type="radio"
//                 name={`yesno-${index}`}
//                 value="no"
//                 className="mr-2"
//               />
//               No
//             </label>
//           </div>
//         );
//       case "rating":
//         return (
//           <div className="flex items-center">
//             {[...Array(10)].map((_, idx) => (
//               <span
//                 key={idx}
//                 style={{
//                   color: idx < (ratingValues[index] || 0) ? "gold" : "gray",
//                   cursor: "pointer",
//                   fontSize: "1.5rem",
//                 }}
//                 onClick={() =>
//                   setRatingValues({ ...ratingValues, [index]: idx + 1 })
//                 }
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleCopyLink = () => {
//     const url = `${window.location.origin}/formPage/${id}`;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         setCopySuccess("Link copied to clipboard!");
//         setTimeout(() => setCopySuccess(""), 3000); // Reset the success message after 3 seconds
//       })
//       .catch((err) => {
//         console.error("Failed to copy: ", err);
//       });
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!form) {
//     return <p>No form data available</p>;
//   }

//   return (
//     <div className="bg-[black] min-h-[100vh] p-5">
//       <div className="flex justify-between items-center mb-10">
//         <h2 className="text-white font-bold text-xl">{form.title}</h2>
//         <div className="flex items-center gap-3">
//           {copySuccess && (
//             <p style={{ color: "green", textAlign: "end" }}>{copySuccess}</p>
//           )}
//           <button
//             onClick={handleCopyLink}
//             style={{
//               background: "#4D9900",
//               color: "white",
//               fontSize: "13px",
//               padding: "8px",
//               borderRadius: "5px",
//             }}
//           >
//             Copy Link
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-center items-center">
//         <div className="w-[70%]">
//           {form.fields.map((field, index) => (
//             <div
//               key={index}
//               className="mb-6 p-4 rounded-sm"
//               style={{ background: "#232428" }}
//             >
//               <Box display={"flex"} alignItems={"baseline"}>
//                 <Typography fontSize={"1rem"} color={"#fff"}>
//                   {index + 1}.
//                 </Typography>
//                 <Typography
//                   fontSize={"1rem"}
//                   color={"#fff"}
//                   mb={2}
//                   dangerouslySetInnerHTML={{
//                     __html: ` ${field.label}`,
//                   }}
//                 />
//               </Box>
//               {renderField(field, index)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;


import { Metadata } from 'next';
import React from 'react';

// Define the props type
interface PageProps {
  params: {
    id: string;
  };
}

// Component Definition
const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = params;

  return <div>Page ID: {id}</div>;
};

export async function generateStaticParams() {
  // Fetch or define the paths to pre-render at build time
  const paths = [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];

  // Return the paths as an array of params objects
  return paths.map((path) => ({ id: path.id }));
}

// If you need to fetch data at build time, do it inside the component.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Fetch data if needed for SEO or other purposes
  return {
    title: `Page ID: ${params.id}`
  };
}

export default Page;

