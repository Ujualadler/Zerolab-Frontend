"use client";

import { baseURL } from "@/Constants/constants";
import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useSearchParams } from "next/navigation";

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
    height: "35px",
    width: "100px",
    fontSize: "small",
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

const textFieldStyle1 = {
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
    width: "150px",
    fontSize: "small",
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

interface Feature {
  _id?: string;
  name: string;
  price: string;
  selected: boolean;
  count: number;
}

interface Product {
  _id?: string;
  name: string;
  price: string;
  features: Feature[];
  isEditing: boolean; // New property to track editing state
  isChange: boolean; // New property to track editing state
  type: string;
  selected: boolean;
  count: number;
  isModuleCount: boolean;
  isIndividual: boolean;
  package: string;
}

interface Lead {
  client: string;
  street: string;
  state: string;
  country: string;
  city: string;
  noOfStudents: number;
}

interface AdditionalCost {
  name: string;
  amount: number;
  quantity: number;
  total: number;
}

const productTypes = ["Single", "Multiple", "Package"];

const Page: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [featurePrices, setFeaturePrices] = useState<string[]>([]);
  const [finalProducts, setFinalProducts] = useState<Product[]>([]);

  const [productType, setProductType] = useState<string>("Single");

  const [additionalCost, setAdditionalCost] = useState<AdditionalCost[]>([]);

  const [costName, setCostName] = useState<string>("");
  const [costAmount, setCostAmount] = useState<number>(0);
  const [costQuantity, setCostQuantity] = useState<number>(1);
  const [totalCost, setTotalCost] = useState<number>(0);

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [leadData, setLeadData] = useState<Lead>();

  const [grantTotal, setGrantTotal] = useState<number>(0);

  const searchParams = useSearchParams();

  const leadId = searchParams.get("leadId");

  const countLabel = "Student count";
  const additionalPriceLabel = "Additional Price";


  useEffect(() => {
    const fetchLead = async (id: string) => {
      try {
        // Fetch lead data from the backend
        const response = await axios.get(`${baseURL}/singleLead?id=${id}`);

        const lead = response.data;
        console.log(lead);
        // Set lead data to state
        setLeadData(lead);
      } catch (e) {
        console.log(e);
      }
    };
    if (leadId) {
      fetchLead(leadId);
    }
  }, [leadId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/product`);
        const fetchedProducts = response.data.map((product: Product) => ({
          ...product,
          isEditing: false,
          selected: true,
          isModuleCount: false,
          isIndividual: true,
          count: 1,
          features: product.features.map((feature) => ({
            ...feature,
            selected: true,
            count: 1,
          })),
        }));
        setData(fetchedProducts);
        setFinalProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (finalProducts) {
      console.log("finalProducts::", finalProducts);
    }
  }, [finalProducts]);

  useEffect(() => {
    if (products) {
      console.log(products);
    }
  }, [products]);

  useEffect(() => {
    if (data?.length > 0 && productType) {
      const filteredProducts = data.filter((item) => item.type === productType);

      console.log(filteredProducts);
      setProducts(filteredProducts);
    }
  }, [productType, data]);

  useEffect(() => {
    if (costAmount && costQuantity) {
      const totalAmount = costAmount * costQuantity;
      setTotalCost(totalAmount);
    }
  }, [costAmount, costQuantity]);

  useEffect(() => {
    if (finalProducts.length > 0) {
      const finalProductsAmount = finalProducts.reduce((total, item) => {
        return item.selected ? total + parseFloat(item.price) : total;
      }, 0);
      setTotalAmount(finalProductsAmount);
    }
  }, [finalProducts]);

  useEffect(() => {
    if(!additionalCost.length) {

      setGrantTotal(totalAmount);
    } else {
      const total = additionalCost.reduce((acc, item) => {
        return acc + item.total;
      }, 0) + totalAmount;
  
      setGrantTotal(total);
    }
  }, [additionalCost, totalAmount]);

  const handleFeaturePriceChange = (
    index: number,
    featureIndex: number,
    value: string
  ) => {
    if (value === "") {
      console.log(value);
      value = "0";
    }
    console.log(value);
    setFinalProducts((prevFinalProducts) => {
      const updatedFinalProducts = JSON.parse(
        JSON.stringify(prevFinalProducts)
      );

      const originalProduct = products[index];

      const originalFeature = originalProduct.features[featureIndex];

      const finalProduct = updatedFinalProducts.find(
        (product: Product) => product._id === originalProduct._id
      );
      const finalFeature = finalProduct.features[featureIndex];

      if(parseInt(originalFeature.price) + parseInt(value) < 0) {
        value = "0";
        return prevFinalProducts;
      }

      const newPrice = parseInt(originalFeature.price) + parseInt(value);

      console.log(newPrice);

      finalFeature.price = `${newPrice}`;

      finalProduct.features[featureIndex] = finalFeature;

      const totalProductPrice = finalProduct.features.reduce(
        (acc: number, feature: Product) => {
          return acc + parseInt(feature.price);
        },
        0
      );

      console.log("toalProductPrice", totalProductPrice);

      finalProduct.price = `${totalProductPrice * finalProduct.count}`;

      updatedFinalProducts[index] = finalProduct;

      return updatedFinalProducts;
    });
  };

  const handleAddAdditionalcost = () => {
    const additionalCost = {
      name: costName,
      amount: costAmount,
      quantity: costQuantity,
      total: totalCost,
    };
    setAdditionalCost((prev) => [...prev, additionalCost]);
    setCostName("");
    setCostAmount(0);
    setCostQuantity(1);
    setTotalCost(0);
  };

  const handleSelect = (id: string, type: string, featureId?: string) => {
    console.log(id, type, featureId);
    let mappedProducts: Product[] | any[] = [];
    let mappedFinalProducts: Product[] | any[] = [];

    if (type === "Product") {
      mappedProducts = products.map((item) =>
        item._id === id
          ? {
              ...item,
              selected: !item.selected,
              features: item.features.map((feature) => ({
                ...feature,
                selected: !item.selected,
              })),
            }
          : item
      );
      mappedFinalProducts = finalProducts.map((item) =>
        item._id === id
          ? {
              ...item,
              selected: !item.selected,
              features: item.features.map((feature) => ({
                ...feature,
                selected: !item.selected,
              })),
            }
          : item
      );
    } else if (type === "Feature") {
      mappedProducts = products.map((product) =>
        product._id === id
          ? {
              ...product,
              price: product.features.reduce((newPrice, feature) => {
                return feature._id === featureId && feature.selected
                  ? newPrice - parseFloat(feature.price)
                  : newPrice + parseFloat(feature.price);
              }, parseFloat(product.price)),
              features: product.features.map((feature) =>
                feature._id === featureId
                  ? {
                      ...feature,
                      selected: !feature.selected,
                    }
                  : feature
              ),
            }
          : product
      );
      console.log(finalProducts);
      mappedFinalProducts = finalProducts.map((product) => {
        if (product._id === id) {
          // Toggle the selected state of the relevant feature first
          const updatedFeatures = product.features.map((feature) =>
            feature._id === featureId
              ? { ...feature, selected: !feature.selected }
              : feature
          );

          // Recalculate the total price based on the updated selection states
          const newPrice = updatedFeatures.reduce((total, feature) => {
            // Only add the price of selected features
            return feature.selected ? total + parseFloat(feature.price) : total;
          }, 0); // Start with 0 and accumulate only selected features' prices

          // Return the updated product with new price and updated features
          return {
            ...product,
            price: newPrice.toFixed(2), // Convert it to a fixed decimal string
            features: updatedFeatures,
          };
        }
        return product;
      });
    }
    setProducts(mappedProducts);
    setFinalProducts(mappedFinalProducts);
  };

  const handleProductModuleCount = (id: string) => {
    const mappedProducts: Product[] = products.map((item) =>
      item._id === id
        ? {
            ...item,
            isModuleCount: !item.isModuleCount,
          }
        : item
    );
    setProducts(mappedProducts);
  };

  const handleIndividualOrMultiple = (id: string) => {
    setFinalProducts((prevState: Product[]) => {
      return prevState.map((product) => {
        if (product._id === id) {
          return { ...product, isIndividual: !product.isIndividual };
        }
        return product;
      });
    });
  };

  const handleProductCount = (id: string, count: string) => {
    console.log(count);

    if (parseInt(count) < 0) count = "1";

    const parsedCount = count ? parseInt(count, 10) : 1;

    console.log(id, parsedCount);

    setFinalProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product._id === id) {
          const baseProduct = products.find((p) => p._id === id) || product;

          const currentUnitPrice = parseFloat(product.price) / product.count;

          const newPrice = (parsedCount * currentUnitPrice).toFixed(2);
          console.log(newPrice);
          return {
            ...product,
            count: parsedCount,
            price: newPrice,
          };
        }
        return product;
      })
    );
  };

  const getProductPrice = (id: string) => {
    const product = finalProducts.find((item) => item._id === id);
    return product?.price;
  };

  const getProductCount = (id: string) => {
    const product = finalProducts.find((item) => item._id === id);
    return product?.count;
  };

  const getFeaturePrice = (productId: string, featureId: string) => {
    const product = finalProducts.find((product) => product._id === productId);
    const feature = product?.features.find(
      (feature) => feature._id === featureId
    );
    return feature?.price;
  };

  const handleCheckSelected = (productId: string) => {
    const product = finalProducts.find(
      (product: Product) => product._id === productId
    );
    return product?.selected;
  };

  const handleCheckFeatureSelected = (productId: string, featureId: string) => {
    const product = finalProducts.find((product) => product._id === productId);
    const feature = product?.features.find(
      (feature) => feature._id === featureId
    );
    return feature?.selected;
  };

  const handleSingleProductPriceChange = (index: number, value: string) => {
    if (!value) {
      value = "0";
    }
    const product = products[index];
    const finalProduct = finalProducts.find((item) => item._id === product._id);
    const finalPrice = finalProduct?.price;
    setFinalProducts((prevProducts: Product[]) =>
      prevProducts.map((item) => {
        if (item._id === finalProduct?._id && finalPrice) {
          const totalPrice = parseFloat(product.price) + parseFloat(value);
          return {
            ...item,
            price: `${totalPrice}`,
          };
        }
        return item;
      })
    );
  };

  const handleFeatureCount = (id: string, featureId: string, count: string) => {
    if (parseInt(count) < 0) count = "1";

    const parsedCount = count ? parseInt(count) : 1;

    setFinalProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product._id === id) {
          const updatedFeatures = product.features.map((feature) => {
            if (feature._id === featureId) {
              const newFeaturePrice = (
                (parsedCount * parseFloat(feature.price)) /
                feature.count
              ).toFixed(2);
              return {
                ...feature,
                count: parsedCount,
                price: newFeaturePrice,
              };
            }
            return feature;
          });

          const newTotalPrice = updatedFeatures
            .reduce((acc, curr) => {
              return acc + parseFloat(curr.price);
            }, 0)
            .toFixed(2);

          return {
            ...product,
            features: updatedFeatures,
            price: `${newTotalPrice}`,
          };
        }
        return product;
      })
    );
  };
  const getFeatureCount = (productId: string, featureId: string) => {
    const product = finalProducts.find((item) => item._id === productId);
    const feature = product?.features.find((item) => item._id === featureId);
    return feature?.count;
  };

  const saveRequirement = async(e: any) => {
    e.preventDefault();
    console.log({ leadId, products: finalProducts, aRequirements: additionalCost });
    const selectedProductsAndFeatures = products.reduce((accum: any[], product: Product) => {
      if (product.selected) {
          // Filter only the selected features of each selected product
          const selectedFeatures = product.features.filter((feature: Feature) => feature.selected);
          
          // If there are selected features, add the product with these features to the accumulator
          if (selectedFeatures.length > 0) {
              accum.push({
                  ...product,
                  features: selectedFeatures
              });
          }
      }
      return accum;
  }, []);
  console.log(selectedProductsAndFeatures);
    const { data } = await axios.post(`${baseURL}/requirement`, { requirements:  { leadId, products: selectedProductsAndFeatures, aRequirements: additionalCost, totalAmount: grantTotal } } );
    if(data.message === "Requirements saved successfully") {
      alert("Requirements saved");
    }
  }

  const getGrantTotal = () => {
    const total = additionalCost.reduce((acc, item) => {
      return acc + item.total;
    }, 0) + totalAmount;

    setGrantTotal(total);

    console.log(total);

    return `${total}`;

  }

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
        minHeight: "100vh",
      }}
    >
      <Grid container>
        <Typography
          color={"white"}
          fontWeight={600}
          fontSize={"1.2rem"}
          mb={2}
          p={5}
          pl={3}
          pb={0}
        >
          Select Products
        </Typography>
        <Divider sx={{ background: "white", width: "100%" }} />

        <Grid container>
          <Grid
            item
            md={8}
            sx={
              {
                // maxHeight: '85vh',
                // overflowY: "auto"
              }
            }
          >
            <Box sx={{ P: 1, m: 3 }} color={"white"}>
              {productTypes.map((item, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() => setProductType(item)}
                    sx={{
                      textTransform: "none",
                      bgcolor: productType === item ? "#48820E" : "",
                      color: "white",
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
            </Box>
            <Grid container display={"flex"}>
              {products.map((product, index) => {
                return (
                  <Grid item md={6} key={index} px={2} mt={4}>
                    <Box
                      key={index}
                      bgcolor={"#03383d"}
                      py={1}
                      borderRadius={2}
                      sx={{
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Example box shadow
                      }}
                    >
                      {/* <div className="p-5">
                        <label>How is the product price calculated?</label>
                        <div className="flex gap-5 mt-2">
                          <div>
                            <input
                              type="radio"
                              id="individual"
                              name="pricingType"
                              value="individual"
                              checked={finalProducts[index].isIndividual}
                              onChange={(e) => handleIndividualOrMultiple(product._id as string)}
                            />
                            <label className="ml-1">Per Individual User</label>
                          </div>

                          <div>
                            <input
                              type="radio"
                              id="organization"
                              name="pricingType"
                              value="organization"
                              checked={!finalProducts[index].isIndividual}
                              onChange={(e) => handleIndividualOrMultiple(product._id as string)}
                            />
                            <label className="ml-1">
                              For Entire Organization
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        width={"100%"}
                        alignItems={"center"}
                        gap={1}
                        p={2}
                      >
                        <Box sx={{ display: "flex", flexDirection: 'column' }}>
                          <Box display={"flex"} alignItems={"center"}>
                            <Checkbox
                              checked={handleCheckSelected(product._id as string)}
                              onChange={() =>
                                handleSelect(product._id as string, "Product")
                              }
                            />
                            <Typography
                              color={"#4D9900"}
                              fontWeight={500}
                              fontSize={"1rem"}
                            >
                              {product.name}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography className="ml-10">{product.package}</Typography>
                          </Box>
                        </Box>
                        <Box>
                          <p className="text-sm">{countLabel}</p>
                          <TextField
                            sx={textFieldStyle}
                            type="number"
                            placeholder="Count"
                            value={getProductCount(product._id as string)} // Bind to the specific product's feature price input
                            onChange={(e) =>
                              handleProductCount(
                                product._id as string,
                                e.target.value
                              )
                            }
                          />
                        </Box>
                        {product.type !== "Single" && (
                          <Box display={"flex"} alignItems={"center"} mr={5}>
                            <Checkbox
                              checked={product.isModuleCount}
                              onChange={() =>
                                handleProductModuleCount(product._id as string)
                              }
                            />
                            <Typography
                              color={"#4D9900"}
                              fontWeight={500}
                              fontSize={"1rem"}
                            >
                              Count for Each Module
                            </Typography>
                          </Box>
                        )}
                        {product.type === "Single" && (
                          <Box>
                            <p className="text-sm">{additionalPriceLabel}</p>
                            <TextField
                              sx={textFieldStyle}
                              type="number"
                              fullWidth
                              placeholder="Add Price"
                              value={featurePrices[index]} // Bind to the specific product's feature price input
                              onChange={(e) =>
                                handleSingleProductPriceChange(
                                  index,
                                  e.target.value
                                )
                              }
                            />
                          </Box>
                        )}
                        <Typography
                          color={"#4D9900"}
                          fontWeight={500}
                          fontSize={"1rem"}
                        >
                          {/* ₹{finalProducts[index].price} */}₹
                          {getProductPrice(product._id as string)}
                        </Typography>
                      </Box>
                      <Divider
                        sx={{
                          display:
                            product.features.length > 0 ? "block" : "none",
                          background: "#8b8b8b",
                          width: "100%",
                          mt: 1,
                        }}
                      />
                      <Box p={2}>
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
                            <Box>
                              <Checkbox
                                checked={handleCheckFeatureSelected(
                                  product._id as string,
                                  feature._id as string
                                )}
                                onChange={() =>
                                  handleSelect(
                                    product._id as string,
                                    "Feature",
                                    feature._id as string
                                  )
                                }
                              />
                              {feature.name}
                            </Box>
                            {/* <Box>
                              <TextField
                                sx={textFieldStyle}
                                type="number"
                                fullWidth
                                placeholder="Students"
                                value={1}
                              />
                            </Box> */}
                            <Box
                              gap={"10px"}
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"space-between"}
                            >
                              <Typography fontSize={"1rem"} color={"white"}>
                                ₹{feature.price}
                              </Typography>
                            </Box>
                            <Box>
                              {product.isModuleCount && (
                                <Box>
                                  <Typography className="text-sm">{countLabel}</Typography>
                                  <TextField
                                  sx={textFieldStyle}
                                  type="number"
                                  placeholder="Count"
                                  value={getFeatureCount(
                                    product._id as string,
                                    feature._id as string
                                  )}
                                  onChange={(e) =>
                                    handleFeatureCount(
                                      product._id as string,
                                      feature._id as string,
                                      e.target.value
                                    )
                                  }
                                />
                                </Box>
                              )}
                            </Box>
                            <Box>
                              <TextField
                                sx={textFieldStyle}
                                type="number"
                                fullWidth
                                placeholder="Add Price"
                                value={featurePrices[index]} // Bind to the specific product's feature price input
                                onChange={(e) =>
                                  handleFeaturePriceChange(
                                    index,
                                    featureIndex,
                                    e.target.value
                                  )
                                }
                              />
                            </Box>
                            <Box>
                              <TextField
                                sx={textFieldStyle}
                                type="number"
                                fullWidth
                                placeholder="Final Price"
                                value={getFeaturePrice(
                                  product._id as string,
                                  feature._id as string
                                )}
                                //   disabled
                              />
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            <Box>
              <Typography
                color={"white"}
                fontWeight={600}
                fontSize={"1.2rem"}
                mb={2}
                p={5}
                pl={3}
                pb={0}
              >
                Additional Cost
              </Typography>
              <Box>
                {additionalCost?.length > 0 &&
                  additionalCost.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        display={"flex"}
                        maxWidth={"800px"}
                        // alignItems={"center"}
                        gap={1}
                        p={2}
                      >
                        <Box>
                          <Typography>Service</Typography>
                          <TextField
                            sx={textFieldStyle1}
                            type="text"
                            fullWidth
                            value={item.name}
                          />
                        </Box>
                        <Box>
                          <Typography>Amount</Typography>
                          <TextField
                            sx={textFieldStyle1}
                            type="number"
                            fullWidth
                            value={item.amount}
                          />
                        </Box>
                        <Box>
                          <Typography>Quantity</Typography>
                          <TextField
                            sx={textFieldStyle1}
                            type="number"
                            fullWidth
                            value={item.quantity}
                          />
                        </Box>
                        <Box>
                          <Typography>Total Price</Typography>
                          <TextField
                            sx={textFieldStyle1}
                            type="number"
                            fullWidth
                            value={item.total}
                          />
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
              <Box
                display={"flex"}
                maxWidth={"800px"}
                // alignItems={"center"}
                gap={1}
                p={2}
              >
                <Box>
                  <Typography>Service</Typography>
                  <TextField
                    sx={textFieldStyle1}
                    type="text"
                    fullWidth
                    placeholder="Enter service name"
                    value={costName}
                    onChange={(e) => setCostName(e.target.value)}
                  />
                </Box>
                <Box>
                  <Typography>Amount</Typography>
                  <TextField
                    sx={textFieldStyle1}
                    type="number"
                    fullWidth
                    placeholder="Amount"
                    value={costAmount}
                    onChange={(e) => setCostAmount(parseInt(e.target.value))}
                  />
                </Box>
                <Box>
                  <Typography>Quantity</Typography>
                  <TextField
                    sx={textFieldStyle1}
                    type="number"
                    fullWidth
                    placeholder="Quantity"
                    value={costQuantity}
                    onChange={(e) => setCostQuantity(parseInt(e.target.value))}
                  />
                </Box>
                <Box>
                  <Typography>Total Price</Typography>
                  <TextField
                    sx={textFieldStyle1}
                    type="number"
                    fullWidth
                    placeholder="Total Price"
                    value={totalCost}
                    onChange={(e) => setTotalCost(parseInt(e.target.value))}
                  />
                </Box>
                <IconButton
                  sx={{ color: "#4D9900", mt: 3 }}
                  onClick={handleAddAdditionalcost}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mr: 5,
              }}
            >
              <Button
                variant="contained"
                size="medium"
                onClick={saveRequirement}
                sx={{ color: "white", background: "#4D9900" }}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box>
              <div className="col-span-4 mr-5 mt-2 rounded-lg p-5 text-white bg-gradient-to-b from-[#011719] to-[#022F35] shadow-2xl backdrop-blur-sm">
                {/* School Information */}
                <h1 className="text-2xl font-bold mt-2 mb-10">
                  Requirement Summary
                </h1>
                <div className="flex justify-between">
                  <h1 className="text-xl font-bold">School Name</h1>
                  <h1 className="text-lg">{leadData?.client}</h1>
                </div>
                <div className="flex justify-between mt-4">
                  <h1 className="text-xl font-bold">Address</h1>
                  <h1 className="text-lg ml-5">
                    {leadData?.street}, {leadData?.state}
                  </h1>
                </div>
                <div className="flex justify-between mt-4">
                  <h1 className="text-xl font-bold">Total Students</h1>
                  <h1 className="text-lg ml-5">{leadData?.noOfStudents}</h1>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between mt-6">
                  <h1 className="text-xl font-bold">Total Amount</h1>
                  <h1 className="text-lg">₹{totalAmount}</h1>
                </div>

                {/* Selected Products */}
                <div className="mt-8">
                  <h1 className="text-xl font-bold">Selected Products</h1>
                  <div className="ml-5 mt-4">
                    {finalProducts.map(
                      (product, index) =>
                        product.selected && (
                          <div
                            key={index}
                            className="p-3 bg-[#03343C] rounded-md mb-3"
                          >
                            <h3 className="text-lg font-semibold">
                              {product.name}
                            </h3>
                            {product.features.map(
                              (feature, featureIndex) =>
                                feature.selected && (
                                  <div key={featureIndex} className="ml-5">
                                    <h3 className="text-sm">
                                      - {feature.name}
                                    </h3>
                                  </div>
                                )
                            )}
                          </div>
                        )
                    )}
                  </div>
                </div>

                {/* Additional Cost */}
                <div className="mt-8">
                  <h1 className="text-xl font-bold">Additional Cost</h1>
                  <div className="ml-5 mt-4">
                    {additionalCost.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 flex justify-between bg-[#03343C] rounded-md mb-3"
                      >
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <h3 className="text-lg">₹{item.total}</h3>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <h1 className="text-xl font-bold">Total Cost</h1>
                  <div>
                    <div className="p-3 flex justify-between bg-[#03343C] rounded-md mb-3">
                      {grantTotal}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Page;
