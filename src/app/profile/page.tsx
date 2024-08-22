"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Switch,
  FormControlLabel,
} from "@mui/material";
import React, { useState, ChangeEvent, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import ProfileTable from "@/components/ProfileTable";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#8B8B8B", // Initial outline color
    },
    "&:hover fieldset": {
      borderColor: "#4D9900", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4D9900", // Outline color when focused
    },
    color: "white",
    borderRadius: 3,
    height: "50px",
  },
  "& .MuiInputLabel-root": {
    color: "#8B8B8B", // Initial label color
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4D9900", // Label color when focused
  },
  "& .MuiInputBase-input": {
    color: "white", // Text color
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#4D9900", // Placeholder color
  },
};

interface MenuTypes {
  name: string;
}

const menuItems: MenuTypes[] = [
  { name: "Invite Members" },
  { name: "Members" },
  { name: "Products" },
];

interface Feature {
  name: string;
  price: string;
}

interface Product {
  _id?: string;
  name: string;
  price: string;
  features: Feature[];
  isEditing: boolean; // New property to track editing state
}
const Page: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [savedEmails, setSavedEmails] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [activeItem, setActive] = useState<string>("Invite Members");

  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [featureNames, setFeatureNames] = useState<string[]>([]);
  const [featurePrices, setFeaturePrices] = useState<string[]>([]);
  const [isEditing, serIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product");
        const fetchedProducts = response.data.map((product: Product) => ({
          ...product,
          isEditing: false, // Add isEditing property to each product
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(""); // Clear error message when the user starts typing
  };

  const validateEmail = (email: string) => {
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleAddEmail = () => {
    if (email) {
      if (validateEmail(email)) {
        if (!savedEmails.includes(email)) {
          setSavedEmails([...savedEmails, email]);
          setEmail(""); // Clear the text field after saving
          setError(""); // Clear any previous error
        } else {
          setError("This email is already added.");
        }
      } else {
        setError("Please enter a valid email address.");
      }
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setSavedEmails(
      savedEmails.filter((savedEmail) => savedEmail !== emailToRemove)
    );
  };

  const handleInvitation = async () => {
    try {
      const response = await axios.post("http://localhost:4000/invitation", {
        emails: savedEmails,
        id: "asgjagsjgasggajs",
      });

      console.log(response);
      // You can handle the response here if needed
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = () => {
    if (productName && productPrice) {
      setProducts([
        ...products,
        {
          name: productName,
          price: productPrice,
          features: [],
          isEditing: false, // Default isEditing state is false
        },
      ]);
      setFeatureNames([...featureNames, ""]);
      setFeaturePrices([...featurePrices, ""]);
      setProductName("");
      setProductPrice("");
    }
  };

  const handleAddFeature = (index: number) => {
    if (featureNames[index] && featurePrices[index]) {
      const updatedProducts = [...products];
      updatedProducts[index].features.push({
        name: featureNames[index],
        price: featurePrices[index],
      });
      setProducts(updatedProducts);

      const updatedFeatureNames = [...featureNames];
      const updatedFeaturePrices = [...featurePrices];
      updatedFeatureNames[index] = "";
      updatedFeaturePrices[index] = "";
      setFeatureNames(updatedFeatureNames);
      setFeaturePrices(updatedFeaturePrices);
    }
  };

  const handleRemoveFeature = (productIndex: number, featureIndex: number) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].features = updatedProducts[
      productIndex
    ].features.filter((_, i) => i !== featureIndex);
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (productIndex: number) => {
    setProducts(products.filter((_, i) => i !== productIndex));
    setFeatureNames(featureNames.filter((_, i) => i !== productIndex));
    setFeaturePrices(featurePrices.filter((_, i) => i !== productIndex));
  };

  const handleFeatureNameChange = (index: number, value: string) => {
    const updatedFeatureNames = [...featureNames];
    updatedFeatureNames[index] = value;
    setFeatureNames(updatedFeatureNames);
  };

  const handleFeaturePriceChange = (index: number, value: string) => {
    const updatedFeaturePrices = [...featurePrices];
    updatedFeaturePrices[index] = value;
    setFeaturePrices(updatedFeaturePrices);
  };

  const toggleEditProduct = (index: number) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].isEditing === true) {
      updatedProducts[index].isEditing = false;
    } else {
      updatedProducts[index].isEditing = true;
    }
    setProducts(updatedProducts);
  };

  const saveProduct = async (product: Product, index: number) => {
    try {
      let response;
      console.log(product);
      if (product._id) {
        response = await axios.post(`http://localhost:4000/product`, {
          id: product._id,
          name: product.name,
          price: product.price,
          features: product.features,
        });
      } else {
        // Create new product
        response = await axios.post(`http://localhost:4000/product`, {
          name: product.name,
          price: product.price,
          features: product.features,
        });
      }

      const updatedProducts = [...products];
      updatedProducts[index] = { ...response.data, isEditing: false }; // Update product with response data and stop editing
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
      }}
    >
      <Grid container>
        <Grid item md={2} sx={{ background: "black", height: "100vh" }}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            p={4}
            alignItems={"start"}
            gap={3}
          >
            <IconButton
              onClick={() => router.push("/")}
              sx={{ color: "#4D9900" }}
            >
              <ArrowBack />
            </IconButton>
            {menuItems.map((data) => (
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => setActive(data.name)}
                color={activeItem === data.name ? "#4D9900" : "white"}
              >
                {data.name}
              </Typography>
            ))}
          </Box>
        </Grid>
        {activeItem === "Invite Members" && (
          <Grid item md={10}>
            <Box sx={{ p: 3 }}>
              <Typography
                color={"white"}
                fontWeight={600}
                fontSize={"1.2rem"}
                mb={2}
              >
                Invite Members
              </Typography>
              <Divider sx={{ background: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                width={"40vw"}
                sx={{ background: "black", borderRadius: 4, p: 3 }}
              >
                <Typography color={"white"} sx={{ mb: 2 }}>
                  Invite People to My Workspace
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                >
                  <TextField
                    sx={{ ...textFieldStyle, width: email ? "95%" : "100%" }}
                    type="text"
                    placeholder="Eg:jhondoe@gmail.com"
                    value={email}
                    onChange={handleEmailChange}
                    error={!!error} // Highlight the text field if there’s an error
                    helperText={error} // Show error message below the text field
                  />
                  {email && (
                    <IconButton
                      sx={{ color: "#4D9900", mt: "5px" }}
                      onClick={handleAddEmail}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Box>

                {/* Confirmation Button */}

                <Box>
                  {savedEmails.map((savedEmail, index) => (
                    <Box
                      key={index}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{
                        backgroundColor: "#1A1A1A",
                        p: 1,
                        borderRadius: 2,
                        mb: 1,
                      }}
                    >
                      <Typography color={"white"}>{savedEmail}</Typography>
                      <IconButton
                        onClick={() => handleRemoveEmail(savedEmail)}
                        sx={{ color: "white" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
                <Box
                  display={"flex"}
                  mt={2}
                  width={"100%"}
                  justifyContent={"end"}
                >
                  <Button
                    size="small"
                    sx={{
                      background: "#4D9900",
                      textTransform: "none",
                      color: "white",
                      "&:hover": { color: "white", background: "gray" },
                    }}
                    // variant="contained"
                    onClick={handleInvitation}
                    disabled={savedEmails.length === 0}
                  >
                    Invite
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        )}
        {activeItem === "Members" && (
          <Grid item container md={10} alignContent={"start"}>
            <Box sx={{ p: 3, width: "100%" }}>
              <Typography
                color={"white"}
                fontWeight={600}
                fontSize={"1.2rem"}
                mb={2}
              >
                Members
              </Typography>
              <Divider sx={{ background: "white", width: "100%" }} />
            </Box>
            <Grid item xs={12} container>
              <Grid item md={3} px={4} py={3}>
                <Box
                  sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"white"}
                  py={2}
                >
                  <Typography fontSize={"1.3rem"}>2</Typography>
                  <Typography>Members</Typography>
                </Box>
              </Grid>
              <Grid item md={3} px={4} py={3}>
                <Box
                  sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"white"}
                  py={2}
                >
                  <Typography fontSize={"1.3rem"}>3</Typography>
                  <Typography>Invitation pending</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box px={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Search by name or email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 4,

                      background: "rgba(12, 80, 101, 0.7)", // Semi-transparent background
                      backdropFilter: "blur(10px)",
                      height: "40px",
                      "& fieldset": {
                        // borderColor: "#0C5065",
                      },
                      "&:hover fieldset": {
                        borderColor: "#80FF00",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0C5065",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white", // Set the text color to white
                      height: "50px",
                      // padding: "0 14px", // Adjust padding to align the text properly
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  type="search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: "lightGray" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Box px={4}>
                <ProfileTable />
              </Box>
            </Grid>
          </Grid>
        )}
        {activeItem === "Products" && (
          <Grid item container md={10} alignContent={"start"}>
            <Box sx={{ p: 3, width: "100%" }}>
              <Typography
                color={"white"}
                fontWeight={600}
                fontSize={"1.2rem"}
                mb={2}
              >
                Products Details
              </Typography>
              <Divider sx={{ background: "white", width: "100%" }} />
            </Box>
            <Grid
              item
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              xs={12}
              px={4}
            >
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <TextField
                  sx={textFieldStyle}
                  type="text"
                  placeholder="Enter Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <TextField
                  sx={textFieldStyle}
                  type="text"
                  placeholder="Enter Product Price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
                <IconButton
                  sx={{ color: "#4D9900" }}
                  onClick={handleAddProduct}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item container xs={12}>
              {products.map((product, productIndex) => (
                <Grid item md={4} key={productIndex} px={4} mt={4}>
                  <Box
                    key={productIndex}
                    bgcolor={"#03383d"}
                    py={1}
                    borderRadius={2}
                    sx={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Example box shadow
                    }}
                  >
                    <Box
                      px={1}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      {product.isEditing ? (
                        <Box display={"flex"} gap={1} width="100%">
                          <TextField
                            fullWidth
                            sx={textFieldStyle}
                            value={product.name}
                            onChange={(e) => {
                              const updatedProducts = [...products];
                              updatedProducts[productIndex].name =
                                e.target.value;
                              setProducts(updatedProducts);
                            }}
                          />
                          <TextField
                            fullWidth
                            sx={textFieldStyle}
                            value={product.price}
                            onChange={(e) => {
                              const updatedProducts = [...products];
                              updatedProducts[productIndex].price =
                                e.target.value;
                              setProducts(updatedProducts);
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          width={"100%"}
                          alignItems={"center"}
                          gap={1}
                        >
                          <Typography
                            color={"#4D9900"}
                            fontWeight={500}
                            fontSize={"1rem"}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            color={"#4D9900"}
                            fontWeight={500}
                            fontSize={"1rem"}
                          >
                            ₹{product.price}
                          </Typography>
                        </Box>
                      )}
                      {product.isEditing && (
                        <IconButton
                          onClick={() => handleRemoveProduct(productIndex)}
                          sx={{ color: "white" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}

                      <Switch
                        checked={product.isEditing}
                        onChange={() => toggleEditProduct(productIndex)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Box>
                    <Divider
                      sx={{ background: "#8b8b8b", width: "100%", mt: 1 }}
                    />

                    {product.features.map((feature, featureIndex) => (
                      <Box
                        px={1}
                        pt={1}
                        key={featureIndex}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        sx={{
                          borderRadius: 2,
                          mt: 1,
                        }}
                      >
                        {product.isEditing ? (
                          <Box display={"flex"} gap={1} width="100%">
                            <TextField
                              sx={textFieldStyle}
                              value={feature.name}
                              fullWidth
                              variant="standard"
                              onChange={(e) => {
                                const updatedProducts = [...products];
                                updatedProducts[productIndex].features[
                                  featureIndex
                                ].name = e.target.value;
                                setProducts(updatedProducts);
                              }}
                            />
                            <TextField
                              sx={textFieldStyle}
                              variant="standard"
                              value={feature.price}
                              fullWidth
                              onChange={(e) => {
                                const updatedProducts = [...products];
                                updatedProducts[productIndex].features[
                                  featureIndex
                                ].price = e.target.value;
                                setProducts(updatedProducts);
                              }}
                            />
                          </Box>
                        ) : (
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            width={"100%"}
                            gap={1}
                          >
                            <Typography fontSize={"1rem"} color={"white"}>
                              {featureIndex + 1}. {feature.name}
                            </Typography>
                            <Typography fontSize={"1rem"} color={"white"}>
                              ₹{feature.price}
                            </Typography>
                          </Box>
                        )}
                        {product.isEditing && (
                          <IconButton
                            onClick={() =>
                              handleRemoveFeature(productIndex, featureIndex)
                            }
                            sx={{ color: "white" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}

                    <Box
                      mt={2}
                      px={1}
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <TextField
                        sx={textFieldStyle}
                        type="text"
                        fullWidth
                        placeholder="Add Feature"
                        value={featureNames[productIndex]} // Bind to the specific product's feature input
                        onChange={(e) =>
                          handleFeatureNameChange(productIndex, e.target.value)
                        }
                      />
                      <TextField
                        sx={textFieldStyle}
                        type="text"
                        fullWidth
                        placeholder="Add Price"
                        value={featurePrices[productIndex]} // Bind to the specific product's feature price input
                        onChange={(e) =>
                          handleFeaturePriceChange(productIndex, e.target.value)
                        }
                      />
                      <IconButton
                        sx={{ color: "#4D9900" }}
                        onClick={() => handleAddFeature(productIndex)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton
                      onClick={() => saveProduct(product, productIndex)}
                      sx={{ color: "white" }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Page;
