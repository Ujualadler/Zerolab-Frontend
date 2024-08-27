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

const dropDownData: dropDownType[] = [
  { title: "Business Type" },
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
  const [showNewVendorField, setShowNewVendorField] =
    React.useState<boolean>(false);
  const [showBusinessType, setShowBusinessType] = React.useState<boolean>(true);

  const handleAddVendorClick = () => {
    setShowNewVendorField(true);
  };

  const [formData, setFormData] = React.useState({
    leadOwner: "",
    leadSource: "",
    leadQuality: "",
    client: "",
    clientType: "",
    industryType: "",
    board: "",
    website: "",
    products: [] as string[],
    currentVendor: "",
    noOfStudents: "",
    spoc: "",
    email: "",
    phone: "",
    mobile: "",
    street: "",
    state: "",
    stateType: "",
    country: "",
    city: "",
    otherDistrict: "",
    district: "",
    zipCode: "",
    assignedTo: "",
    assignmentDate: "",
    decisionMaker: "",
    status: "pending",
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
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value as string[] | string,
    });

    if(name==='clientType' && value==='individual'){
      setShowBusinessType(false)
    }
  };

  const handleMultipleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value as string[],
    });
  };
  const handleSubmit = async () => {
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
            sx={{background: "linear-gradient(180deg, #011719 0%, #03292C 100%)"}}
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

          <Grid container p={4} mt={6}>
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
                <Grid item md={6} px={4} spacing={3}>
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
                <Grid item md={6} px={4} spacing={3}>
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
            <Grid container px={4} >
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
                  maxHeight={"60vh"}
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
                            <MenuItem value={"Jissmon"}>Jissmon</MenuItem>
                            <MenuItem value={"Joy Sunny"}>Joy Sunny</MenuItem>
                            <MenuItem value={"Adarsh"}>Adarsh</MenuItem>
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
                            <MenuItem value={"Other"}>Other</MenuItem>
                          </Select>
                        </FormControl>
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
                              <MenuItem value={"Alin Anto"}>Vendor 1</MenuItem>
                              <MenuItem value={"Jissmon"}>Vendor 2</MenuItem>
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
                              (selected as string[]).join(", ")
                            }
                            label="Products"
                          >
                            {productList.map((product) => (
                              <MenuItem key={product} value={product}>
                                <Checkbox
                                  checked={
                                    formData.products.indexOf(product) > -1
                                  }
                                />
                                <ListItemText primary={product} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                            <MenuItem value={"Kerala"}>Kerala</MenuItem>
                            <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
                            <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="demo-simple-select-label">
                            State Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="stateType"
                            value={formData.stateType}
                            onChange={handleSelectChange}
                            label="State Type"
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
                            <MenuItem value={"USA"}>USA</MenuItem>
                            <MenuItem value={"UK"}>UK</MenuItem>
                            <MenuItem value={"Australia"}>Australia</MenuItem>
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
                          label="Other District"
                          name="otherDistrict"
                          value={formData.otherDistrict}
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
                            <MenuItem value={"Joy Sony"}>Joy Sony</MenuItem>
                            <MenuItem value={"Jissmon George"}>
                              Jissmon George
                            </MenuItem>
                            <MenuItem value={"Annam Giri"}>Annam Giri</MenuItem>
                            <MenuItem value={"Akash"}>Akash</MenuItem>
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
                  mt={1}
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
                  <Box sx={{ color: "white" }}>
                    <Typography fontSize={"15px"}>Products</Typography>
                    <Box display={"flex"} gap={"1px"}>
                      {formData.products.length > 0 ? (
                        formData.products.map((pdts, index) => (
                          <Typography
                            key={index}
                            fontSize={"15px"}
                            color={"#4D9900"}
                          >
                            {pdts},
                          </Typography>
                        ))
                      ) : (
                        <Typography color={"red"} fontSize={"15px"}>
                          Not Selected
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
          {formData.clientType === "parent" && (
            <Grid>
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
