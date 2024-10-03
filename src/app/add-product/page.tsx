// import { Grid, Typography, Box, Divider, TextField } from "@mui/material";

import Page from "../page";

// const Page: React.FC = () => {
//   return (
//     <div
//       style={{
//         background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
//       }}
//     >
//       <Grid item container md={10} alignContent={"start"}>
//             <Box sx={{ p: 3, width: "100%" }}>
//               <Typography
//                 color={"white"}
//                 fontWeight={600}
//                 fontSize={"1.2rem"}
//                 mb={2}
//               >
//                 Products Details
//               </Typography>
//               <Divider sx={{ background: "white", width: "100%" }} />
//             </Box>
//             <Grid
//               item
//               display={"flex"}
//               justifyContent={"space-between"}
//               alignItems={"center"}
//               xs={12}
//               px={4}
//             >
//               <Box display={"flex"} alignItems={"center"} gap={2}>
//                 <TextField
//                   sx={textFieldStyle}
//                   type="text"
//                   placeholder="Enter Product Name"
//                   value={productName}
//                   onChange={(e) => setProductName(e.target.value)}
//                 />
//                 <TextField
//                   sx={textFieldStyle}
//                   type="text"
//                   placeholder="Enter Product Price"
//                   value={productPrice}
//                   onChange={(e) => setProductPrice(e.target.value)}
//                 />
//                 <IconButton
//                   sx={{ color: "#4D9900" }}
//                   onClick={handleAddProduct}
//                 >
//                   <AddIcon />
//                 </IconButton>
//               </Box>
//             </Grid>
//             <Grid item container xs={12}>
//               {products.map((product, productIndex) => (
//                 <Grid item md={4} key={productIndex} px={4} mt={4}>
//                   <Box
//                     key={productIndex}
//                     bgcolor={"#03383d"}
//                     py={1}
//                     borderRadius={2}
//                     sx={{
//                       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Example box shadow
//                     }}
//                   >
//                     <Box
//                       px={1}
//                       display={"flex"}
//                       justifyContent={"space-between"}
//                       alignItems={"center"}
//                       sx={{
//                         borderRadius: 2,
//                       }}
//                     >
//                       {product.isEditing ? (
//                         <Box display={"flex"} gap={1} width="100%">
//                           <TextField
//                             fullWidth
//                             sx={textFieldStyle}
//                             value={product.name}
//                             onChange={(e) => {
//                               const updatedProducts = [...products];
//                               updatedProducts[productIndex].name =
//                                 e.target.value;
//                               updatedProducts[productIndex].isChange = true;
//                               setProducts(updatedProducts);
//                             }}
//                           />
//                           <TextField
//                             fullWidth
//                             sx={textFieldStyle}
//                             value={product.price}
//                             onChange={(e) => {
//                               const updatedProducts = [...products];
//                               updatedProducts[productIndex].price =
//                                 e.target.value;
//                               updatedProducts[productIndex].isChange = true;
//                               setProducts(updatedProducts);
//                             }}
//                           />
//                         </Box>
//                       ) : (
//                         <Box
//                           display={"flex"}
//                           justifyContent={"space-between"}
//                           width={"100%"}
//                           alignItems={"center"}
//                           gap={1}
//                         >
//                           <Typography
//                             color={"#4D9900"}
//                             fontWeight={500}
//                             fontSize={"1rem"}
//                           >
//                             {product.name}
//                           </Typography>
//                           <Typography
//                             color={"#4D9900"}
//                             fontWeight={500}
//                             fontSize={"1rem"}
//                           >
//                             ₹{product.price}
//                           </Typography>
//                         </Box>
//                       )}
//                       {product.isEditing && (
//                         <IconButton
//                           onClick={() => handleRemoveProduct(productIndex)}
//                           sx={{ color: "white" }}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       )}
//                     </Box>
//                     <Divider
//                       sx={{ background: "#8b8b8b", width: "100%", mt: 1 }}
//                     />

//                     {product.features.map((feature, featureIndex) => (
//                       <Box
//                         px={1}
//                         pt={1}
//                         key={featureIndex}
//                         display={"flex"}
//                         justifyContent={"space-between"}
//                         alignItems={"center"}
//                         sx={{
//                           borderRadius: 2,
//                           mt: 1,
//                         }}
//                       >
//                         {product.isEditing ? (
//                           <Box display={"flex"} gap={1} width="100%">
//                             <TextField
//                               sx={textFieldStyle}
//                               value={feature.name}
//                               fullWidth
//                               variant="standard"
//                               onChange={(e) => {
//                                 const updatedProducts = [...products];
//                                 updatedProducts[productIndex].features[
//                                   featureIndex
//                                 ].name = e.target.value;
//                                 updatedProducts[productIndex].isChange = true;
//                                 setProducts(updatedProducts);
//                               }}
//                             />
//                             <TextField
//                               sx={textFieldStyle}
//                               variant="standard"
//                               value={feature.price}
//                               fullWidth
//                               onChange={(e) => {
//                                 const updatedProducts = [...products];
//                                 updatedProducts[productIndex].features[
//                                   featureIndex
//                                 ].price = e.target.value;
//                                 updatedProducts[productIndex].isChange = true;
//                                 setProducts(updatedProducts);
//                               }}
//                             />
//                           </Box>
//                         ) : (
//                           <Box
//                             display={"flex"}
//                             alignItems={"center"}
//                             justifyContent={"space-between"}
//                             width={"100%"}
//                             gap={1}
//                           >
//                             <Typography fontSize={"1rem"} color={"white"}>
//                               {featureIndex + 1}. {feature.name}
//                             </Typography>
//                             <Typography fontSize={"1rem"} color={"white"}>
//                               ₹{feature.price}
//                             </Typography>
//                           </Box>
//                         )}
//                         {product.isEditing && (
//                           <IconButton
//                             onClick={() =>
//                               handleRemoveFeature(productIndex, featureIndex)
//                             }
//                             sx={{ color: "white" }}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         )}
//                       </Box>
//                     ))}

//                     <Box
//                       mt={2}
//                       px={1}
//                       display={"flex"}
//                       alignItems={"center"}
//                       gap={2}
//                     >
//                       <TextField
//                         sx={textFieldStyle}
//                         type="text"
//                         fullWidth
//                         placeholder="Add Feature"
//                         value={featureNames[productIndex]} // Bind to the specific product's feature input
//                         onChange={(e) =>
//                           handleFeatureNameChange(productIndex, e.target.value)
//                         }
//                       />
//                       <TextField
//                         sx={textFieldStyle}
//                         type="text"
//                         fullWidth
//                         placeholder="Add Price"
//                         value={featurePrices[productIndex]} // Bind to the specific product's feature price input
//                         onChange={(e) =>
//                           handleFeaturePriceChange(productIndex, e.target.value)
//                         }
//                       />
//                       <IconButton
//                         sx={{ color: "#4D9900" }}
//                         onClick={() => handleAddFeature(productIndex)}
//                       >
//                         <AddIcon />
//                       </IconButton>
//                     </Box>
//                     <Box
//                       display={"flex"}
//                       gap={"2px"}
//                       px={1}
//                       justifyContent={"space-between"}
//                       mt={1.5}
//                       alignItems={"center"}
//                     >
//                       <Box display={"flex"} alignItems={"center"}>
//                         <Typography color={"whitesmoke"}>Edit</Typography>
//                         <Switch
//                           checked={product.isEditing}
//                           onChange={() => toggleEditProduct(productIndex)}
//                           inputProps={{ "aria-label": "controlled" }}
//                           sx={{
//                             "& .Mui-checked": {
//                               color: "#4D9900",
//                             },
//                             "& .Mui-checked + .MuiSwitch-track": {
//                               backgroundColor: "#4D9900",
//                             },
//                           }}
//                         />
//                       </Box>
//                       {product.isChange && (
//                         <Button
//                           variant="contained"
//                           size="small"
//                           onClick={() => saveProduct(product, productIndex)}
//                           sx={{ color: "white", background: "#4D9900" }}
//                           startIcon={<SaveIcon />}
//                         >
//                           Save
//                         </Button>
//                       )}
//                     </Box>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//     </div>
//   );
// };

// export default Page;

export default Page; 
