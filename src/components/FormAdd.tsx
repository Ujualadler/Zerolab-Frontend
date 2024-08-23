import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill CSS
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "99vw",
  height: "99vh",
  background: "#2a2b2f",
  borderRadius: 4,
  boxShadow: 24,
  overflow: "auto",
};

interface FormAddProps {
  open: boolean;
  show: (value: boolean) => void;
}

type FormFieldType =
  | "text"
  | "select"
  | "checkbox"
  | "radio"
  | "yesno"
  | "rating";

interface FormField {
  id: number;
  type: FormFieldType;
  label: string;
  options?: string[];
  ratingValue?: number;
}

const FormAdd: React.FC<FormAddProps> = ({ open, show }) => {
  const [formFields, setFormFields] = React.useState<FormField[]>([]);
  const [nextId, setNextId] = React.useState(1);
  const [previewMode, setPreviewMode] = React.useState(false);
  const [formTitle, setFormTitle] = React.useState<string>("");

  const handleClose = () => show(false);

  const addField = (type: FormFieldType) => {
    const newField: FormField = {
      id: nextId,
      type,
      label: "",
      options:
        type === "select" || type === "checkbox" || type === "radio"
          ? ["Option 1"]
          : undefined,
      ratingValue: type === "rating" ? 0 : undefined,
    };
    setFormFields([...formFields, newField]);
    setNextId(nextId + 1);
  };

  const updateFieldLabel = (id: number, label: string) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, label } : field
    );
    setFormFields(updatedFields);
  };

  const updateFieldOptions = (id: number, options: string[]) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, options } : field
    );
    setFormFields(updatedFields);
  };

  const updateRatingValue = (id: number, ratingValue: number) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, ratingValue } : field
    );
    setFormFields(updatedFields);
  };

  const removeField = (id: number) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const handleSave = async () => {
    try {
      // Prepare the data to be sent to the backend
      const formData = {
        title: formTitle, // The title of the form
        fields: formFields, // The form fields array
      };

      console.log(formData);

      // Send a POST request to your backend API to save the form
      const response = await axios.post("http://localhost:4000/form", formData);
      setFormFields([]);
      setFormTitle("");

      // Handle the successful response
      console.log("Form saved successfully:", response.data);
      // Optionally, you can reset the form state or navigate to another page
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error saving form:", error);
    }
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder="Text input"
            className="p-2 rounded-sm bg-[#2a2b2f] text-white w-full"
          />
        );
      case "select":
        return (
          <select className="p-2 rounded-sm bg-[#2a2b2f] text-white w-full">
            {field.options?.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div>
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center text-white">
                <input type="checkbox" className="mr-2 text-white" />
                {option}
              </label>
            ))}
          </div>
        );
      case "radio":
        return (
          <div>
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center text-white">
                <input
                  type="radio"
                  name={`radio-${field.id}`}
                  className="mr-2 text-white"
                />
                {option}
              </label>
            ))}
          </div>
        );
      case "yesno":
        return (
          <div className="flex gap-4">
            <label className="flex items-center text-white">
              <input
                type="radio"
                name={`yesno-${field.id}`}
                value="yes"
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center text-white">
              <input
                type="radio"
                name={`yesno-${field.id}`}
                value="no"
                className="mr-2"
              />
              No
            </label>
          </div>
        );
      case "rating":
        return (
          <div className="flex items-center">
            {[...Array(10)].map((_, index) => (
              <span
                key={index}
                style={{
                  color: index < (field.ratingValue || 0) ? "gold" : "gray",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
                onClick={() => updateRatingValue(field.id, index + 1)}
              >
                ★
              </span>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    return (
      <div>
        <Typography fontSize={"1.5rem"} color={"#fff"} mb={4}>
          {formTitle}
        </Typography>
        {formFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-6 p-4 rounded-sm"
            style={{ background: "#232428" }}
          >
            <Box display={"flex"} alignItems={"baseline"}>
              <Typography fontSize={"1rem"} color={"#fff"}>
                {index + 1}.
              </Typography>
              <Typography
                fontSize={"1rem"}
                color={"#fff"}
                mb={2}
                dangerouslySetInnerHTML={{
                  __html: ` ${field.label}`,
                }}
              />
            </Box>
            {renderField(field)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          overflow={"hidden"}
          color={"white"}
          width={"100%"}
          p={2}
          mb={2}
        >
          <Typography fontSize={"1.5rem"} fontWeight={600} color={"#fff"}>
            Create Form
          </Typography>
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
        <Box>
          <Grid container px={4}>
            <Grid
              item
              xs={9}
              p={3}
              maxHeight={"75vh"}
              overflow={"auto"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "5px",
                  height: "8px", // Height for horizontal scrollbar
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
              {!previewMode ? (
                <>
                  <Box mb={4}>
                    <TextField
                      fullWidth
                      label="Form Title"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      variant="outlined"
                      sx={{
                        input: { color: "white" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "#4D9900",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#4D9900",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#4D9900",
                        },
                      }}
                    />
                  </Box>
                  {formFields.map((field) => (
                    <div
                      key={field.id}
                      className="mb-6  rounded shadow-md"
                      style={{ background: "#232428" }}
                    >
                      <div className="flex justify-end items-center">
                        <IconButton
                          size="small"
                          onClick={() => removeField(field.id)}
                          style={{
                            color: "white",
                            marginLeft: "10px",
                          }}
                        >
                          <Close />
                        </IconButton>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2 ">
                          <ReactQuill
                            theme="snow"
                            value={field.label}
                            onChange={(value) =>
                              updateFieldLabel(field.id, value)
                            }
                            placeholder="Add a Label..."
                            style={{
                              background: "#2a2b2f",
                              color: "white",
                              borderRadius: "4px",
                              width: "100%",
                            }}
                          />
                        </div>

                        {["select", "checkbox", "radio"].includes(
                          field.type
                        ) && (
                          <div className="mb-2">
                            {field.options?.map((option, idx) => (
                              <div key={idx} className="flex items-center mb-2">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [
                                      ...(field.options || []),
                                    ];
                                    newOptions[idx] = e.target.value;
                                    updateFieldOptions(field.id, newOptions);
                                  }}
                                  placeholder="Option"
                                  className="p-2 bg-[#2a2b2f] text-white rounded-sm flex-grow"
                                />
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    const newOptions = field.options?.filter(
                                      (_, i) => i !== idx
                                    );
                                    updateFieldOptions(
                                      field.id,
                                      newOptions || []
                                    );
                                  }}
                                  style={{
                                    marginLeft: "10px",
                                    color: "white",
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            ))}
                            <IconButton
                              onClick={() =>
                                updateFieldOptions(field.id, [
                                  ...(field.options || []),
                                  `Option ${(field.options?.length || 0) + 1}`,
                                ])
                              }
                              style={{ color: "white" }}
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                        )}

                        <div>{renderField(field)}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                renderPreview()
              )}
            </Grid>
            <Grid
              item
              xs={3}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              p={3}
              alignSelf={"start"}
              gap={1}
            >
              {!previewMode && (
                <>
                  <Button
                    onClick={() => addField("text")}
                    variant="contained"
                    sx={{ textTransform: "none", background: "black" }}
                  >
                    Add Text Input
                  </Button>
                  <Button
                    onClick={() => addField("select")}
                    variant="contained"
                    sx={{ textTransform: "none", background: "black" }}
                  >
                    Add Dropdown
                  </Button>
                  <Button
                    onClick={() => addField("checkbox")}
                    variant="contained"
                    sx={{ textTransform: "none", background: "black" }}
                  >
                    Add Multiple Choice
                  </Button>
                  <Button
                    onClick={() => addField("radio")}
                    variant="contained"
                    sx={{ textTransform: "none", background: "black" }}
                  >
                    Add Single Choice
                  </Button>
                  <Button
                    onClick={() => addField("yesno")}
                    variant="contained"
                    sx={{ textTransform: "none", background: "black" }}
                  >
                    Add Yes/No
                  </Button>
                  <Button
                    onClick={() => addField("rating")}
                    variant="contained"
                    sx={{ textTransform: "none", background: "black" }}
                  >
                    Add Star Rating
                  </Button>
                </>
              )}
              <Button
                onClick={() => setPreviewMode(!previewMode)}
                variant="contained"
                sx={{
                  textTransform: "none",
                  background: previewMode ? "#FF5722" : "#4D9900",
                  marginTop: "10px",
                }}
              >
                {previewMode ? "Back to Edit" : "Preview Form"}
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  background: "#4D9900",
                  marginTop: "10px",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormAdd;
