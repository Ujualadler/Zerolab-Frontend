import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { SlideProps } from "@mui/material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { baseURL } from "@/Constants/constants";
import { ArrowDownward, ArrowDropDown, Business } from "@mui/icons-material";
import { da } from "date-fns/locale";

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EventDetailsProps {
  open: boolean;
  show: (value: boolean) => void;
}

interface dropDownType {
  title: string;
}

interface IFeature {
  _id: string; // Include _id as ObjectId type (or string if using string IDs)
  name: string;
  price: string;
}

interface Product {
  _id?: string;
  name: string;
  price: string;
  features: IFeature[];
}

interface States {
  name: string;
  state_code: string;
}

const dropDownData: dropDownType[] = [
  { title: "Lead Details" },
  { title: "Additional Information" },
  { title: "Assignment Information" },
];

const productList = ["LMS", "ERP", "DC", "Website"];

export default function LeadAdding({ open, show }: EventDetailsProps) {
  const setVhProperty = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const [activetoggle, setActiveToggle] =
    React.useState<string>("Lead Details");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [states, setStates] = React.useState<States[]>([]);

  const [showNewVendorField, setShowNewVendorField] =
    React.useState<boolean>(false);
  const [showBusinessType, setShowBusinessType] = React.useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = React.useState<Product[]>([]);

  const handleAddVendorClick = () => {
    setShowNewVendorField(true);
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/product`);
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  React.useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          { country: "India" }
        );
        setStates(response.data.data.states);
        console.log(response.data.data.states);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCountry();
  }, []);

  console.log(products);

  const index = dropDownData.findIndex((data) => data.title === activetoggle);

  console.log(index);

  const handleProductSelection = () => {};

  const handleNextClick = () => {
    const index = dropDownData.findIndex((data) => data.title === activetoggle);
    if (index === dropDownData.length - 1) {
      setActiveToggle(dropDownData[0].title);
    } else {
      setActiveToggle(dropDownData[index + 1].title);
    }
  };

  const [formData, setFormData] = React.useState({
    leadOwner: "",
    affiliationCode: "",
    leadSource: "",
    dealValue: "",
    leadQuality: "",
    client: "",
    clientType: "",
    industryType: "",
    board: "",
    description: "",
    website: "",
    products: [] as string[], // Array to hold selected product IDs
    selectedFeatures: {} as Record<string, string[]>,
    currentVendor: "",
    noOfStudents: "",
    spoc: "",
    email: "",
    phone: "",
    mobile: "",
    street: "",
    state: "",
    country: "",
    city: "",
    district: "",
    zipCode: "",
    assignedTo: "",
    assignmentDate: "",
    decisionMaker: "",
    status: "pending",
    leadStatus: "Lead Generation",
  });

  console.log(formData);

  React.useEffect(() => {
    setVhProperty();
    window.addEventListener("resize", setVhProperty);
    return () => {
      window.removeEventListener("resize", setVhProperty);
    };
  }, []);

  const handleClose = () => {
    show(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string[] | string>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value as string[] | string,
    });
  };

  const handleMultipleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;

    console.log(name, value);

    const selectedproduct = products.filter((data) => value[0] === data._id);

    setSelectedProduct(selectedproduct);

    console.log(selectedProduct);
    setFormData({
      ...formData,
      [name]: value as string[],
    });
  };
  // Log the filtered products to check what you are getting

  const handleSubmit = async () => {
    console.log(formData.products.filter((data) => data !== undefined));

    // Create a new filtered products array
    const newProducts = formData.products.filter((data) => data !== undefined);

    // Update the formData with the new products array
    setFormData({
      ...formData, // Spread the current formData state
      products: newProducts, // Update the products field with the filtered array
    });
    console.log(formData);

    try {
      const response = await axios.post(`${baseURL}/lead`, formData);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
    mb: 3,
  };

  const selectStyle = {
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
      "& .MuiSelect-select": {
        color: "white", // Text color
      },
      borderRadius: 3,
      height: "50px",
    },
    "& .MuiInputLabel-root": {
      color: "#8B8B8B", // Initial label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#4D9900", // Label color when focused
    },
    mb: 3,
  };

  const handleMenuMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the menu from closing
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the menu from closing
    setShowNewVendorField(!showNewVendorField);
  };

  const handleProductSelectChange = (productId: string) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.products.includes(productId);
      let updatedProducts = [...prevFormData.products];

      console.log(prevFormData.products);

      let updatedSelectedFeatures = { ...prevFormData.selectedFeatures }; // Copy current selected features

      if (isSelected) {
        // Deselect the product: remove it and its features
        updatedProducts = updatedProducts.filter((id) => id !== productId); // Remove the selected product ID
        delete updatedSelectedFeatures[productId]; // Remove associated features
      } else {
        // Select the product: add it and its features
        updatedProducts.push(productId); // Safely add the product ID to the array

        const productFeatures =
          products
            .find((p) => p._id === productId)
            ?.features.map((f) => f._id) || []; // Safely map features

        updatedSelectedFeatures[productId] = productFeatures;
      }

      // Remove all undefined values from the updatedProducts array
      updatedProducts = updatedProducts.filter((data) => data !== undefined);

      console.log("Updated Products:", updatedProducts);
      console.log("Updated Selected Features:", updatedSelectedFeatures);

      // Return the updated state
      return {
        ...prevFormData,
        products: updatedProducts,
        selectedFeatures: updatedSelectedFeatures,
      };
    });
  };

  console.log(formData);
  const handleFeatureSelectChange = (productId: string, featureId: string) => {
    setFormData((prevFormData) => {
      const currentFeatures = prevFormData.selectedFeatures[productId] || [];
      const isSelected = currentFeatures.includes(featureId);

      // Update features based on selection/deselection
      const updatedFeatures = isSelected
        ? currentFeatures.filter((id) => id !== featureId)
        : [...currentFeatures, featureId];

      console.log(prevFormData);

      // Filter out any undefined values from the products array
      const filteredProducts = prevFormData.products.filter(
        (product) => product !== undefined
      );

      // If a product has no selected features after the update, remove it from the products array
      const updatedSelectedFeatures = { ...prevFormData.selectedFeatures };
      if (updatedFeatures.length === 0) {
        delete updatedSelectedFeatures[productId]; // Remove the product from selectedFeatures if no features are selected
      } else {
        updatedSelectedFeatures[productId] = updatedFeatures; // Update the product's selected features
      }

      // Update the formData state
      return {
        ...prevFormData,
        products: filteredProducts,
        selectedFeatures: updatedSelectedFeatures,
      };
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Transition}
        transitionDuration={500}
        PaperProps={{
          sx: {
            position: "absolute",
            bottom: 0,
            height: { xs: "calc(var(--vh, 1vh) * 90)" },
            maxHeight: "90vh",
            width: "100vw",
            zIndex: 100000,
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
            background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
          },
        }}
      >
        <Box position={"relative"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            overflow={"hidden"}
            color={"white"}
            width={"100%"}
            position={"fixed"}
            zIndex={10000000}
            sx={{
              background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
            }}
            mb={{ xs: 2, sm: 0 }}
            p={3}
          >
            <h1 className="ml-2 text-white font-bold text-lg ">Lead Master</h1>
            <IconButton
              size="small"
              sx={{
                background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
              }}
              onClick={handleClose}
            >
              <Close sx={{ color: "#80FF00" }} />
            </IconButton>
          </Box>

          <Grid container px={10} mt={10}>
            <Grid item xs={12}>
              <Box display={"flex"} alignItems={"center"}>
                <h1 className="ml-5 py-3 pl-3 text-white font-semibold text-lg">
                  Business Type
                </h1>
                <IconButton
                  size="small"
                  onClick={() => setShowBusinessType(!showBusinessType)}
                  sx={{
                    color: "#4D9900",
                    transform: showBusinessType
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease-out", // Smooth rotation animation
                  }}
                >
                  <ArrowDropDown />
                </IconButton>
              </Box>
            </Grid>
            {showBusinessType && (
              <>
                <Grid item md={4} px={4} spacing={3}>
                  <FormControl fullWidth sx={selectStyle}>
                    <InputLabel id="demo-simple-select-label">
                      Client Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="clientType"
                      value={formData.clientType}
                      onChange={handleSelectChange}
                      label="Client Type"
                    >
                      <MenuItem value={"parent"}>Parent</MenuItem>
                      <MenuItem value={"individual"}>Individual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4} px={4} spacing={3}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Client"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      sx={{ ...textFieldStyle }}
                    />
                  </Box>
                </Grid>
                <Grid item md={4} px={4} spacing={3}>
                  <FormControl fullWidth sx={selectStyle}>
                    <InputLabel id="demo-simple-select-label">
                      Industry Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleSelectChange}
                      label="Industry Type"
                    >
                      <MenuItem value={"group"}>Group</MenuItem>
                      <MenuItem value={"individual"}>Individual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
          {formData.clientType === "individual" && (
            <Grid container px={4}>
              <Grid
                item
                md={2}
                display={"flex"}
                justifyContent={"center"}
                height={{ xs: "calc(var(--vh, 1vh) * 72)" }}
                flexDirection={"column"}
              >
                {dropDownData.map((data, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <span
                        style={{
                          height: "17px",
                          width: "17px",
                          borderRadius: "50%",
                          background:
                            activetoggle === data.title ? "#00B2FF" : "",
                          border: "2px solid #00B2FF",
                        }}
                      />
                      <span
                        style={{
                          display:
                            index === dropDownData.length - 1 ? "none" : "flex",
                          height: "50px",
                          width: "2px",
                          background: "#6C6C6C",
                        }}
                      />
                    </Box>
                    <Button
                      onClick={() => setActiveToggle(data.title)}
                      variant="outlined"
                      sx={{
                        color: "white",
                        border:
                          activetoggle === data.title
                            ? "1px solid  #4D9900"
                            : "1px solid #00B2FF",
                        height: "35px",
                        width: "200px",
                        textTransform: "none",
                        bottom: 10,
                        borderRadius: 3,
                      }}
                    >
                      {data.title}
                    </Button>
                  </Box>
                ))}
              </Grid>
              <Grid item container md={7} alignContent={"start"}>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                  mb={2}
                >
                  <Box
                    display={"flex"}
                    width={"70%"}
                    p={1}
                    sx={{ color: "white" }}
                    justifyContent={"center"}
                    columnGap={3}
                    borderBottom={"1px dashed white"}
                    alignItems={"center"}
                  >
                    <Box>
                      {formData.client ? (
                        <Typography fontSize={"15px"} fontWeight={600}>
                          {formData.client}
                        </Typography>
                      ) : (
                        <Typography fontSize={"15px"} color={"red"}>
                          Add School
                        </Typography>
                      )}
                      {formData.state ? (
                        <Typography fontSize={"15px"}>
                          {formData.state}
                        </Typography>
                      ) : (
                        <Typography fontSize={"15px"} color={"red"}>
                          Add State
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Typography fontSize={"15px"} fontWeight={600}>
                        Decision Maker
                      </Typography>
                      {formData.decisionMaker ? (
                        <Typography fontSize={"15px"} color={"#4D9900"}>
                          {formData.decisionMaker}
                        </Typography>
                      ) : (
                        <Typography fontSize={"15px"} color={"red"}>
                          Not Added
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Typography fontSize={"15px"} fontWeight={600}>
                        Time Frame
                      </Typography>
                      <Typography fontSize={"15px"} color={"#4D9900"}>
                        26-May-2024 to 16 July-2024
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  height={"calc(var(--vh, 1vh) * 45)"}
                  overflow={"auto"}
                  alignContent={"start"}
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "5px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#011719",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#4D9900",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#80FF00",
                    },
                  }}
                >
                  {activetoggle === "Lead Details" && (
                    <>
                      <Grid item xs={12}>
                        <h1 className="ml-5 p-3 text-white font-semibold text-lg">
                          Lead Details
                        </h1>
                      </Grid>
                      <Grid item md={6} px={4} spacing={3}>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-simple-select-label">
                            Lead Owner
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="leadOwner"
                            value={formData.leadOwner}
                            onChange={handleSelectChange}
                            label="Lead Owner"
                          >
                            <MenuItem value={"Alin Anto"}>Alin Anto</MenuItem>
                            <MenuItem value={"Jissmon George"}>
                              Jissmon
                            </MenuItem>
                            <MenuItem value={"Annam Giri"}>Joy Sunny</MenuItem>
                            <MenuItem value={"Adarsh Shetty"}>Adarsh</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-simple-select-label">
                            Lead Source
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="leadSource"
                            value={formData.leadSource}
                            onChange={handleSelectChange}
                            label="Lead Source"
                          >
                            <MenuItem value={"Inside Sales"}>
                              Inside Sales
                            </MenuItem>
                            <MenuItem value={"Sales"}>Sales</MenuItem>
                            <MenuItem value={"Website"}>Website</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-simple-select-label">
                            Lead Quality
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="leadQuality"
                            value={formData.leadQuality}
                            onChange={handleSelectChange}
                            label="Lead Quality"
                          >
                            <MenuItem value={"High"}>High</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Low"}>Low</MenuItem>
                          </Select>
                        </FormControl>

                        {/* <TextField
                        fullWidth
                        type="text"
                        label="Current Vendor"
                        name="currentVendor"
                        value={formData.currentVendor}
                        onChange={handleInputChange}
                        sx={textFieldStyle}
                      /> */}

                        <Box>
                          {/* Your existing FormControl and TextField elements */}
                          <FormControl fullWidth sx={selectStyle}>
                            <InputLabel id="demo-simple-select-label">
                              Current Vendor
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="currentVendor"
                              value={formData.currentVendor}
                              onChange={handleSelectChange}
                              label="Current Vendor"
                              MenuProps={{
                                PaperProps: {
                                  onMouseDown: handleMenuMouseDown, // Prevents the menu from closing
                                },
                              }}
                            >
                              <MenuItem value={"Extramarks"}>
                                Extramarks
                              </MenuItem>
                              <MenuItem value={"Next Education"}>
                                Next Education
                              </MenuItem>
                              <MenuItem value={"Tata ClassEdge"}>
                                Tata ClassEdge
                              </MenuItem>
                              <MenuItem>
                                <Button
                                  onClick={handleButtonClick}
                                  sx={{
                                    textTransform: "none",
                                    color: "#48820E",
                                  }}
                                >
                                  Add New Vendor
                                </Button>
                              </MenuItem>
                            </Select>
                          </FormControl>

                          {showNewVendorField && (
                            <TextField
                              fullWidth
                              type="text"
                              label="New Vendor"
                              name="currentVendor"
                              value={formData.currentVendor}
                              onChange={handleInputChange}
                              sx={{ ...textFieldStyle }}
                            />
                          )}
                        </Box>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-simple-select-label">
                            Board
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="board"
                            value={formData.board}
                            onChange={handleSelectChange}
                            label="Board"
                          >
                            <MenuItem value={"CBSE"}>CBSE</MenuItem>
                            <MenuItem value={"State"}>State</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-multiple-checkbox-label">
                            Products
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            name="products"
                            multiple
                            value={formData.products}
                            onChange={handleMultipleSelectChange}
                            renderValue={(selected) =>
                              (selected as string[])
                                .map((id) => {
                                  const product = products.find(
                                    (p) => p._id === id
                                  );
                                  return product ? product.name : "";
                                })
                                .join(", ")
                            }
                            label="Products"
                          >
                            {products.map((product) => (
                              <div key={product._id}>
                                {/* Product Menu Item */}
                                <MenuItem value={product._id}>
                                  <Checkbox
                                    checked={formData.products.includes(
                                      product._id ?? ""
                                    )} // Using ?? to provide a default value
                                    onChange={() =>
                                      handleProductSelectChange(
                                        product._id ?? ""
                                      )
                                    } // Providing a default value if undefined
                                  />
                                  <ListItemText primary={product.name} />
                                </MenuItem>

                                {/* Display features if the product is selected */}
                                {formData.products.includes(
                                  product._id ?? ""
                                ) &&
                                  product.features.map((feature) => (
                                    <MenuItem key={feature._id} sx={{ pl: 4 }}>
                                      <Checkbox
                                        checked={
                                          formData.selectedFeatures[
                                            product._id ?? ""
                                          ]?.includes(feature._id ?? "") ||
                                          false
                                        }
                                        onChange={() =>
                                          handleFeatureSelectChange(
                                            product._id ?? "",
                                            feature._id ?? ""
                                          )
                                        }
                                      />
                                      <ListItemText primary={feature.name} />
                                    </MenuItem>
                                  ))}
                              </div>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          type="number"
                          label="Deal Value"
                          name="dealValue"
                          value={formData.dealValue}
                          onChange={handleInputChange}
                          sx={{ ...textFieldStyle }}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Affiliation Code"
                          name="description"
                          value={formData.affiliationCode}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                      </Grid>
                      <Grid item md={6} px={4} spacing={3}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Decision Maker"
                          name="decisionMaker"
                          value={formData.decisionMaker}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="SPOC"
                          name="spoc"
                          value={formData.spoc}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="email"
                          label="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          label="Mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          label="No of Students"
                          name="noOfStudents"
                          value={formData.noOfStudents}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                      </Grid>
                    </>
                  )}

                  {activetoggle === "Additional Information" && (
                    <>
                      <Grid item xs={12}>
                        <h1 className="ml-5 p-3 text-white font-semibold text-lg">
                          Additional Information
                        </h1>
                      </Grid>
                      <Grid item md={6} px={4} spacing={3}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Street"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-simple-select-label">
                            State
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="state"
                            value={formData.state}
                            onChange={handleSelectChange}
                            label="State"
                          >
                            {states.length > 0 &&
                              states.map((data, index) => (
                                <MenuItem key={index} value={data.name}>
                                  {data.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-simple-select-label">
                            Country
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="country"
                            value={formData.country}
                            onChange={handleSelectChange}
                            label="Country"
                          >
                            <MenuItem value={"India"}>India</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={6} px={4} spacing={3}>
                        <TextField
                          fullWidth
                          type="text"
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="District"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          label="ZIP Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                      </Grid>
                    </>
                  )}
                  {activetoggle === "Assignment Information" && (
                    <>
                      <Grid item xs={12}>
                        <h1 className="ml-5 p-3 text-white font-semibold text-lg">
                          Assignment Information
                        </h1>
                      </Grid>
                      <Grid item md={6} px={4} spacing={3}>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-simple-select-label">
                            Assigned To
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleSelectChange}
                            label="Assigned To"
                          >
                            <MenuItem value={"Alin Anto"}>Alin Anto</MenuItem>
                            <MenuItem value={"Jissmon George"}>
                              Jissmon George
                            </MenuItem>
                            <MenuItem value={"Annam Giri"}>
                              Annam Giri Prakash
                            </MenuItem>
                            <MenuItem value={"Adarsh Shetty"}>Akash</MenuItem>
                          </Select>
                        </FormControl>
                        <InputLabel sx={{ color: "#4D9900", mb: "3px" }}>
                          Assignment Date
                        </InputLabel>
                        <TextField
                          fullWidth
                          type="date"
                          name="assignmentDate"
                          value={formData.assignmentDate}
                          onChange={handleInputChange}
                          sx={textFieldStyle}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  mt={3}
                  gap={1}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                      backgroundColor: "#4D9900",
                      color: "white",
                      borderRadius: 3,
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextClick}
                    sx={{
                      backgroundColor: "#4D9900",
                      color: "white",
                      borderRadius: 3,
                    }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3} p={2} px={4}>
                <Box
                  display={"flex"}
                  gap={3}
                  py={2}
                  borderBottom={"1px dashed #8B8B8B"}
                >
                  <Box
                    sx={{
                      background: "#1F3635",
                      color: "white",
                      p: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Typography fontSize={"15px"}>Strength</Typography>
                    {formData.noOfStudents ? (
                      <Typography fontSize={"15px"} color={"#4D9900"}>
                        {formData.noOfStudents}
                      </Typography>
                    ) : (
                      <Typography fontSize={"15px"} color={"red"}>
                        Not Added
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ color: "white" }}>
                    <Typography fontSize={"15px"}>Value</Typography>
                    <Typography fontSize={"18px"} color={"#4D9900"}>
                      ₹52,23,0000
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  gap={3}
                  py={2}
                  borderBottom={"1px dashed #8B8B8B"}
                >
                  <Box sx={{ background: "1F3635", color: "white" }}>
                    <Typography fontSize={"15px"}>Lead Quality</Typography>
                    {formData.leadQuality ? (
                      <Typography fontSize={"15px"} color={"#4D9900"}>
                        {formData.leadQuality}
                      </Typography>
                    ) : (
                      <Typography fontSize={"15px"} color={"red"}>
                        Not Added
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={3}
                  py={2}
                  borderBottom={"1px dashed #8B8B8B"}
                >
                  <Box
                    sx={{
                      background: "#1F3635",
                      color: "white",
                      p: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Typography fontSize={"15px"}>Status</Typography>
                    <Typography fontSize={"15px"} color={"#4D9900"}>
                      New
                    </Typography>
                  </Box>
                  <Box sx={{ color: "white" }}>
                    <Typography>No</Typography>
                    <Typography fontSize={"15px"} color={"#4D9900"}>
                      Duplicate Detection
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={3}
                  py={2}
                  borderBottom={"1px dashed #8B8B8B"}
                >
                  <Box sx={{ color: "white" }}>
                    <Typography fontSize={"15px"}>Team</Typography>
                    <Typography fontSize={"15px"} color={"#4D9900"}>
                      A
                    </Typography>
                  </Box>
                  <Box sx={{ color: "white" }}>
                    <Typography>Lead Owner</Typography>
                    {formData.leadOwner ? (
                      <Typography fontSize={"15px"} color={"#4D9900"}>
                        {formData.leadOwner}
                      </Typography>
                    ) : (
                      <Typography fontSize={"15px"} color={"red"}>
                        Not Added
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={3}
                  py={2}
                  borderBottom={"1px dashed #8B8B8B"}
                >
                  <Box sx={{ color: "white" }}>
                    <Typography fontSize={"15px"}>Current Vendor</Typography>
                    {formData.currentVendor ? (
                      <Typography fontSize={"15px"} color={"#4D9900"}>
                        {formData.currentVendor}
                      </Typography>
                    ) : (
                      <Typography fontSize={"15px"} color={"red"}>
                        Not Added
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ color: "white" }}>
                    <Typography>Website</Typography>
                    <Typography fontSize={"15px"} color={"#4D9900"}>
                      Lead Channel
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={3}
                  pt={2}
                  // borderBottom={"1px dashed #8B8B8B"}
                >
                  <Box display={"flex"} gap={"1px"}>
                    {formData.products.length > 0 ? (
                      formData.products.map((pdts, index) => {
                        const product = products.find((p) => p._id === pdts); // Find the product by ID

                        return (
                          <Typography
                            key={index}
                            fontSize={"15px"}
                            color={"#4D9900"}
                          >
                            {product && product.name},{" "}
                            {/* Display product name */}
                          </Typography>
                        );
                      })
                    ) : (
                      <Typography color={"red"} fontSize={"15px"}>
                        Not Selected
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
          {formData.clientType === "parent" && (
            <Grid
              height={"50vh"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                textAlign={"center"}
                fontSize={"1.5rem"}
                fontWeight={600}
                color={"#4D9900"}
              >
                Feature Coming Soon
              </Typography>
            </Grid>
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
