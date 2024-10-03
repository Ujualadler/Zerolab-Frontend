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
  Select,
  MenuItem,
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
import { baseURL } from "@/Constants/constants";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ToastContainer, toast } from "react-toastify";
import ProductList from "@/components/ProductList";
import "react-toastify/dist/ReactToastify.css";

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
  { name: "Competitor" },
];

interface Feature {
  name: string;
  price: string;
}

interface Product {
  _id?: string;
  type: string;
  package: string;
  name: string;
  price: string;
  features: Feature[];
  isEditing: boolean; // New property to track editing state
  isChange: boolean; // New property to track editing state
}

const productTypes: ("Single" | "Multiple" | "Package")[] = [
  "Single",
  "Multiple",
  "Package",
];

const packageTypes: ("Single" | "Multiple")[] = ["Single", "Multiple"];

const packages: ("Basic" | "Medium" | "Premium")[] = [
  "Basic",
  "Medium",
  "Premium",
];

const Page: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [savedEmails, setSavedEmails] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [activeItem, setActive] = useState<string>("Invite Members");

  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [featureNames, setFeatureNames] = useState<string[]>([]);
  const [featurePrices, setFeaturePrices] = useState<string[]>([]);
  const [isEditing, serIsEditing] = useState<boolean>(false);

  const [productType, setProductType] = useState<string>("Single");

  const [packageType, setPackageType] = useState<string>("Single");

  const [packageName, setPackageName] = useState<string>("Basic");

  const [multipleProducts, setMultipleProducts] = useState<Product[]>([]);

  const [subProductName, setSubProductName] = useState<string>("");
  const [subProductPrice, setSubProductPrice] = useState<string>("");

  const [singleProductName, setSingleProductName] = useState<string>("");
  const [singleProductPrice, setSingleProductPrice] = useState<string>("");

  const [packageProductName, setPackageProductName] = useState<string>("");
  const [packageProductPrice, setPackageProductPrice] = useState<string>("");

  const [packageSubProductName, setPackageSubProductName] =
    useState<string>("");
  const [packageSubProductPrice, setPackageSubProductPrice] =
    useState<string>("");

  const [packageMultipleProductName, setPackageMultipleProductName] =
    useState<string>("");
  const [packageMultipleProductPrice, setPackgeMultipleProductPrice] =
    useState<string>("");

  const [isListProduct, setListProduct] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/product`);
        const fetchedProducts = response.data.map((product: Product) => ({
          ...product,
          isEditing: false, // Add isEditing property to each product
        }));
        // setProducts(fetchedProducts);
        // setInitialProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const notify = (message: string) => toast(message);

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
      const response = await axios.post(`${baseURL}/invitation`, {
        emails: savedEmails,
        id: "asgjagsjgasggajs",
      });

      console.log(response);
      // You can handle the response here if needed
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleAddProduct = () => {
    console.log(productType, packageType);
    if (productType === "Single" && singleProductName && singleProductPrice) {
      setProducts([
        ...products,
        {
          name: singleProductName,
          type: productType,
          package: "",
          price: singleProductPrice,
          features: [],
          isEditing: false,
          isChange: false,
        },
      ]);
      setFeatureNames([...featureNames, ""]);
      setFeaturePrices([...featurePrices, ""]);
      setSingleProductName("");
      setSingleProductPrice("");
    } else if (
      productType === "Multiple" &&
      productName &&
      productPrice &&
      subProductName &&
      subProductPrice
    ) {
      const product = products.filter((item) => item.type === "Multiple");
      let productTotalPrice = 0;
      if (product.length > 0) {
        productTotalPrice = product[0].features.reduce((totalPrice, item) => {
          return totalPrice + parseFloat(item.price);
        }, 0);
        productTotalPrice += parseFloat(subProductPrice);
        console.log("product", product);
        setProducts((prevProducts) => [
          ...prevProducts.map((p) =>
            p.type === "Multiple"
              ? {
                  ...p,
                  price: `${productTotalPrice}`,
                  features: [
                    ...p.features,
                    {
                      name: subProductName,
                      price: subProductPrice,
                    },
                  ],
                }
              : p
          ),
        ]);
      } else {
        productTotalPrice = parseFloat(subProductPrice);
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            name: productName,
            type: productType,
            package: "",
            price: `${productTotalPrice}`,
            features: [
              {
                name: subProductName,
                price: subProductPrice,
              },
            ],
            isEditing: false, // Default isEditing state is false
            isChange: true, // Default isChange state is true
          },
        ]);
      }
      console.log(productTotalPrice);
      setProductPrice(`${productTotalPrice}`);

      setSubProductName("");
      setSubProductPrice("");
    } else if (
      productType === "Package" &&
      packageType === "Single" &&
      packageProductName &&
      packageProductPrice
    ) {
      setProducts([
        ...products,
        {
          name: packageProductName,
          type: productType,
          package: packageName,
          price: packageProductPrice,
          features: [],
          isEditing: false, // Default isEditing state is false
          isChange: true, // Default isChanging state is false
        },
      ]);

      setPackageProductName("");
      setPackageProductPrice("");
    } else if (
      productType === "Package" &&
      packageType === "Multiple" &&
      packageMultipleProductName &&
      packageMultipleProductPrice &&
      packageSubProductName &&
      packageSubProductPrice
    ) {
      const product = products.filter(
        (item) => item.type === "Package" && item.features.length > 0
      );
      console.log(product);
      let productTotalPrice = 0;
      if (product.length > 0) {
        productTotalPrice = product[0].features.reduce((totalPrice, item) => {
          return totalPrice + parseFloat(item.price);
        }, 0);
        productTotalPrice += parseFloat(packageSubProductPrice);
        setProducts((prevProducts) => [
          ...prevProducts.map((p) =>
            p.type === "Package" && p.features.length > 0
              ? {
                  ...p,
                  price: `${productTotalPrice}`,
                  features: [
                    ...p.features,
                    {
                      name: packageSubProductName,
                      price: packageSubProductPrice,
                    },
                  ],
                }
              : p
          ),
        ]);
      } else {
        productTotalPrice = parseFloat(packageSubProductPrice);
        console.log(productTotalPrice);
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            name: packageMultipleProductName,
            type: productType,
            package: packageName,
            price: `${productTotalPrice}`,
            features: [
              {
                name: packageSubProductName,
                price: packageSubProductPrice,
              },
            ],
            isEditing: false, // Default isEditing state is false
            isChange: true, // Default isChange state is true
          },
        ]);
      }
      setPackgeMultipleProductPrice(`${productTotalPrice}`);
      setPackageSubProductName("");
      setPackageSubProductPrice("");
    }
  };

  const handleAddSubProduct = () => {
    console.log(products);
    if (subProductName && subProductPrice) {
      const product = products.filter((item) => item.type === "Multiple");
      console.log(product);
    }
  };

  const handleAddFeature = (index: number) => {
    if (featureNames[index] && featurePrices[index]) {
      const updatedProducts = [...products];
      updatedProducts[index].features.push({
        name: featureNames[index],
        price: featurePrices[index],
      });
      updatedProducts[index].isChange = true;
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
    updatedProducts[productIndex].isChange = true;
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
    console.log(updatedFeatureNames);
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

  const saveProduct = async () => {
    try {
      console.log("products", products);
      let productData: Product | any = {};
      if (productType === "Single") {
        productData = products.find((item, index) => item.type === "Single");
      } else if (productType === "Multiple") {
        productData = products.find((item, index) => item.type === "Multiple");
      } else if (productType === "Package" && packageType === "Single") {
        productData = products.find(
          (item, index) => item.type === "Package" && !item.features.length
        );
      } else if (productType === "Package" && packageType === "Multiple") {
        productData = products.find(
          (item, index) => item.type === "Package" && item.features.length
        );
      }
      if (productData) {
        try {
          const { data } = await axios.post(`${baseURL}/product`, productData);
          console.log(data);
          notify("Product created");
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  return (
    <>
    
    {isListProduct && <ProductList open={isListProduct} show={setListProduct} /> }
    <div
      style={{
        background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
      }}
    >
      
      <ToastContainer />
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
            {menuItems.map((data, index) => (
              <Typography
                key={index}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  color={"white"}
                  fontWeight={600}
                  fontSize={"1.2rem"}
                  mb={2}
                >
                  Products
                </Typography>
                <Button
                  onClick={() => setListProduct(true)}
                  variant="contained"
                  disableElevation
                  sx={{ textTransform: "none", background: "#48820E" }}
                >
                  List products
                </Button>
              </Box>
              <Divider sx={{ background: "white", width: "100%" }} />
            </Box>
            <Box display={"flex"} gap={2} ml={3}>
              {productTypes.map((type, index) => {
                return (
                  <Box
                    key={index}
                    color={productType === type ? "#4D9900" : "white"}
                    sx={{
                      background: "#03383D",
                      p: 2,
                    }}
                    onClick={() => setProductType(type)}
                  >
                    {type}
                  </Box>
                );
              })}
            </Box>
            {productType === "Single" && (
              <Grid container>
                <Grid
                  item
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"start"}
                  gap={"10px"}
                  xs={12}
                  px={3}
                  mt={5}
                >
                  {products.map((item, index) => {
                    return (
                      item.type === "Single" && (
                        <Box
                          key={index}
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <TextField
                            sx={textFieldStyle}
                            type="text"
                            placeholder="Enter Product Name"
                            value={item.name}
                            // onChange={(e) => setProductName(e.target.value)}
                          />
                          <TextField
                            sx={textFieldStyle}
                            type="text"
                            placeholder="Enter Product Price"
                            value={item.price}
                            // onChange={(e) => setProductPrice(e.target.value)}
                          />
                          {/* <IconButton
                            sx={{ color: "#4D9900" }}
                            onClick={handleAddProduct}
                          >
                            <AddIcon />
                          </IconButton> */}
                        </Box>
                      )
                    );
                  })}
                  <Box display={"flex"} alignItems={"center"} gap={2}>
                    <TextField
                      sx={textFieldStyle}
                      type="text"
                      placeholder="Enter Product Name"
                      value={singleProductName}
                      onChange={(e) => setSingleProductName(e.target.value)}
                    />
                    <TextField
                      sx={textFieldStyle}
                      type="text"
                      placeholder="Enter Product Price"
                      value={singleProductPrice}
                      onChange={(e) => setSingleProductPrice(e.target.value)}
                    />
                    <IconButton
                      sx={{ color: "#4D9900" }}
                      onClick={handleAddProduct}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => saveProduct()}
                    sx={{
                      color: "white",
                      ml: "420px",
                      mt: 3,
                      background: "#4D9900",
                    }}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            )}
            {productType === "Multiple" && (
              <>
                <Grid
                  item
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"20px"}
                  alignItems={"start"}
                  xs={12}
                  px={3}
                  mt={5}
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
                      placeholder="Enter Price"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </Box>
                  {products
                    .filter((item, index) => item.type === "Multiple")
                    .map((item, index) => {
                      return (
                        <>
                          {item.features.map((subProduct, subProductIndex) => {
                            return (
                              <Box
                                key={subProductIndex}
                                display={"flex"}
                                alignItems={"center"}
                                gap={2}
                                ml={5}
                              >
                                <TextField
                                  sx={textFieldStyle}
                                  type="text"
                                  placeholder="Enter Subproduct Name"
                                  value={subProduct.name}
                                  // onChange={(e) =>
                                  //   setProductName(e.target.value)
                                  // }
                                />
                                <TextField
                                  sx={textFieldStyle}
                                  type="text"
                                  placeholder="Enter Price"
                                  value={subProduct.price}
                                  // onChange={(e) =>
                                  //   setProductPrice(e.target.value)
                                  // }
                                />
                                {/* <IconButton
                                  sx={{ color: "#4D9900" }}
                                  onClick={handleAddProduct}
                                >
                                  <AddIcon />
                                </IconButton> */}
                              </Box>
                            );
                          })}
                        </>
                      );
                    })}
                  <Box display={"flex"} alignItems={"center"} gap={2} ml={5}>
                    <TextField
                      sx={textFieldStyle}
                      type="text"
                      placeholder="Enter Subproduct Name"
                      value={subProductName}
                      onChange={(e) => setSubProductName(e.target.value)}
                    />
                    <TextField
                      sx={textFieldStyle}
                      type="text"
                      placeholder="Enter Price"
                      value={subProductPrice}
                      onChange={(e) => setSubProductPrice(e.target.value)}
                    />
                    <IconButton
                      sx={{ color: "#4D9900" }}
                      onClick={handleAddProduct}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => saveProduct()}
                    sx={{
                      color: "white",
                      ml: "460px",
                      mt: 3,
                      background: "#4D9900",
                    }}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              </>
            )}
            {productType === "Package" && (
              <Grid container>
                <Grid
                  item
                  display={"flex"}
                  gap={"20px"}
                  // justifyContent={"space-between"}
                  alignItems={"center"}
                  xs={12}
                  px={8}
                  mt={5}
                >
                  <Box>
                    <Typography>Select package type</Typography>
                    <Select
                      value={packageType} // Use state name or an empty string if none selected
                      onChange={(e) => setPackageType(e.target.value)}
                      sx={{
                        mt: 2,
                        height: "40px",
                        bgcolor: "black",
                        color: "white",
                        fontSize: "12px",
                      }}
                      IconComponent={(props) => (
                        <ArrowDropDownIcon
                          {...props}
                          style={{ color: "#80FF00" }}
                        />
                      )}
                      displayEmpty
                    >
                      {packageTypes.map((type, index) => {
                        return (
                          <MenuItem key={index} value={type}>
                            {type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    <Typography>Select package</Typography>
                    <Select
                      value={packageName} // Use state name or an empty string if none selected
                      onChange={(e) => setPackageName(e.target.value)}
                      sx={{
                        mt: 2,
                        height: "40px",
                        bgcolor: "black",
                        color: "white",
                        fontSize: "12px",
                      }}
                      IconComponent={(props) => (
                        <ArrowDropDownIcon
                          {...props}
                          style={{ color: "#80FF00" }}
                        />
                      )}
                      displayEmpty
                    >
                      {packages.map((type, index) => {
                        return (
                          <MenuItem key={index} value={type}>
                            {type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                </Grid>
                {packageType === "Single" ? (
                  <Grid container>
                    <Grid
                      item
                      display={"flex"}
                      flexDirection={"column"}
                      gap={"20px"}
                      alignItems={"start"}
                      xs={12}
                      px={3}
                      mt={5}
                    >
                      {products.map((item, index) => {
                        return (
                          item.type === "Package" &&
                          packageType === "Single" &&
                          item.features.length < 1 && (
                            <Box
                              key={index}
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                            >
                              <TextField
                                sx={textFieldStyle}
                                type="text"
                                placeholder="Enter Product Name"
                                value={item.name}
                                // onChange={(e) =>
                                //   setPackageProductName(e.target.value)
                                // }
                              />
                              <TextField
                                sx={textFieldStyle}
                                type="text"
                                placeholder="Enter Product Price"
                                value={item.price}
                                // onChange={(e) =>
                                //   setPackageProductPrice(e.target.value)
                                // }
                              />
                              {/* <IconButton
                              sx={{ color: "#4D9900" }}
                              onClick={handleAddProduct}
                            >
                              <AddIcon />
                            </IconButton> */}
                            </Box>
                          )
                        );
                      })}
                      <Box display={"flex"} alignItems={"center"} gap={2}>
                        <TextField
                          sx={textFieldStyle}
                          type="text"
                          placeholder="Enter Product Name"
                          value={packageProductName}
                          onChange={(e) =>
                            setPackageProductName(e.target.value)
                          }
                        />
                        <TextField
                          sx={textFieldStyle}
                          type="text"
                          placeholder="Enter Product Price"
                          value={packageProductPrice}
                          onChange={(e) =>
                            setPackageProductPrice(e.target.value)
                          }
                        />
                        <IconButton
                          sx={{ color: "#4D9900" }}
                          onClick={handleAddProduct}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => saveProduct()}
                        sx={{
                          color: "white",
                          ml: "420px",
                          mt: 3,
                          background: "#4D9900",
                        }}
                        startIcon={<SaveIcon />}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <>
                    <Grid
                      item
                      display={"flex"}
                      flexDirection={"column"}
                      gap={"20px"}
                      alignItems={"start"}
                      xs={12}
                      px={3}
                      mt={5}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={2}>
                        <TextField
                          sx={textFieldStyle}
                          type="text"
                          placeholder="Enter Product Name"
                          value={packageMultipleProductName}
                          onChange={(e) =>
                            setPackageMultipleProductName(e.target.value)
                          }
                        />
                        <TextField
                          sx={textFieldStyle}
                          type="text"
                          placeholder="Enter Price"
                          value={packageMultipleProductPrice}
                          onChange={(e) =>
                            setPackgeMultipleProductPrice(e.target.value)
                          }
                        />
                        {/* <IconButton
                          sx={{ color: "#4D9900" }}
                          onClick={handleAddProduct}
                        >
                          <AddIcon />
                        </IconButton> */}
                      </Box>
                      {products
                        .filter(
                          (item, index) =>
                            item.type === "Package" &&
                            packageType === "Multiple"
                        )
                        .map((item, index) => {
                          return (
                            <>
                              {item.features.map(
                                (subProduct, subProductIndex) => {
                                  return (
                                    <Box
                                      key={subProductIndex}
                                      display={"flex"}
                                      alignItems={"center"}
                                      gap={2}
                                      ml={5}
                                    >
                                      <TextField
                                        sx={textFieldStyle}
                                        type="text"
                                        placeholder="Enter Subproduct Name"
                                        value={subProduct.name}
                                        // onChange={(e) =>
                                        //   setProductName(e.target.value)
                                        // }
                                      />
                                      <TextField
                                        sx={textFieldStyle}
                                        type="text"
                                        placeholder="Enter Price"
                                        value={subProduct.price}
                                        // onChange={(e) =>
                                        //   setProductPrice(e.target.value)
                                        // }
                                      />
                                      {/* <IconButton
                                  sx={{ color: "#4D9900" }}
                                  onClick={handleAddProduct}
                                >
                                  <AddIcon />
                                </IconButton> */}
                                    </Box>
                                  );
                                }
                              )}
                            </>
                          );
                        })}

                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                        ml={5}
                      >
                        <TextField
                          sx={textFieldStyle}
                          type="text"
                          placeholder="Enter Subproduct Name"
                          value={packageSubProductName}
                          onChange={(e) =>
                            setPackageSubProductName(e.target.value)
                          }
                        />
                        <TextField
                          sx={textFieldStyle}
                          type="text"
                          placeholder="Enter Price"
                          value={packageSubProductPrice}
                          onChange={(e) =>
                            setPackageSubProductPrice(e.target.value)
                          }
                        />
                        <IconButton
                          sx={{ color: "#4D9900" }}
                          onClick={handleAddProduct}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => saveProduct()}
                        sx={{
                          color: "white",
                          ml: "460px",
                          mt: 3,
                          background: "#4D9900",
                        }}
                        startIcon={<SaveIcon />}
                      >
                        Save
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
              // {
              //   packageType === "Single" ?
              //   <Box display={"flex"} alignItems={"center"} gap={2}>
              //   <TextField
              //     sx={textFieldStyle}
              //     type="text"
              //     placeholder="Enter Product Name"
              //     value={productName}
              //     onChange={(e) => setProductName(e.target.value)}
              //   />
              //   <TextField
              //     sx={textFieldStyle}
              //     type="text"
              //     placeholder="Enter Product Price"
              //     value={productPrice}
              //     onChange={(e) => setProductPrice(e.target.value)}
              //   />
              //   <IconButton
              //     sx={{ color: "#4D9900" }}
              //     onClick={handleAddProduct}
              //   >
              //     <AddIcon />
              //   </IconButton>
              // </Box> :
              // <></>
              // }
            )}

            {/* <Grid
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
            </Grid> */}
            {/* <Grid item container xs={12}>
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
                              updatedProducts[productIndex].isChange = true;
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
                              updatedProducts[productIndex].isChange = true;
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
                                updatedProducts[productIndex].isChange = true;
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
                                updatedProducts[productIndex].isChange = true;
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
                    <Box
                      display={"flex"}
                      gap={"2px"}
                      px={1}
                      justifyContent={"space-between"}
                      mt={1.5}
                      alignItems={"center"}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        <Typography color={"whitesmoke"}>Edit</Typography>
                        <Switch
                          checked={product.isEditing}
                          onChange={() => toggleEditProduct(productIndex)}
                          inputProps={{ "aria-label": "controlled" }}
                          sx={{
                            "& .Mui-checked": {
                              color: "#4D9900",
                            },
                            "& .Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "#4D9900",
                            },
                          }}
                        />
                      </Box>
                      {product.isChange && (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => saveProduct(product, productIndex)}
                          sx={{ color: "white", background: "#4D9900" }}
                          startIcon={<SaveIcon />}
                        >
                          Save
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid> */}
          </Grid>
        )}
        {activeItem === "Competitor" && (
          <Grid item container md={10} alignContent={"start"}>
            <Box sx={{ p: 3, width: "100%" }}>
              <Typography
                color={"white"}
                fontWeight={600}
                fontSize={"1.2rem"}
                mb={2}
              >
                Competitor Details
              </Typography>
              <Divider sx={{ background: "white", width: "100%" }} />
            </Box>
          </Grid>
        )}
      </Grid>
    </div>

    </>
  );
};

export default Page;
