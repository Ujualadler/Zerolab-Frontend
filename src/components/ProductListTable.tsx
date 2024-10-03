import {
    Box,
    Button,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    IconButton,
    Collapse,
    Typography,
    Divider,
  } from "@mui/material";
  import Paper from "@mui/material/Paper";
  import React, { useEffect, useState } from "react";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import ExpandLessIcon from "@mui/icons-material/ExpandLess";
  
  const productTypes: string[] = ["Single", "Multiple", "Package"];
  
  // Sample product data for each type
//   const products = [
//     {
//       name: "Product A",
//       type: "Single",
//       price: "100",
//     },
//     {
//       name: "Product B",
//       type: "Multiple",
//       price: "200",
//       features: [
//         { name: "Feature 1", price: "50" },
//         { name: "Feature 2", price: "75" },
//       ],
//     },
//     {
//       name: "Product C",
//       type: "Package",
//       package: "Premium",
//       price: "300",
//       features: [
//         { name: "Feature A", price: "80" },
//         { name: "Feature B", price: "100" },
//       ],
//     },
//   ];

  const products = [
    {
      _id: '66cffcd0f3fbf3296985ed41',
      name: 'LMS',
      price: '32001',
      features: [
        {
          _id: '66cffcd0f3fbf3296985ed3d',
          name: 'Teaching Panel',
          price: '12001',
          __v: 0
        },
        {
          _id: '66cffcd0f3fbf3296985ed3f',
          name: 'Digital Content',
          price: '20000',
          __v: 0
        }
      ],
      __v: 0
    },
    {
      _id: '66d748fdcac575afa7b0091d',
      name: 'ERP',
      price: '3500',
      features: [
        {
          _id: '66f13896d3ac9affa22d9fe1',
          name: 'Fee',
          price: '2000',
          __v: 0
        },
        {
          _id: '66f13ed8d3ac9affa22d9fe7',
          name: 'Attendence',
          price: '1500',
          __v: 0
        }
      ],
      __v: 0
    },
    {
      _id: '66d7490ccac575afa7b00920',
      name: 'DC',
      price: '1000',
      features: [
        {
          _id: '66f14591d3ac9affa22d9fec',
          name: 'DC',
          price: '1000',
          __v: 0
        }
      ],
      __v: 0
    },
    {
      _id: '66d7491ccac575afa7b00923',
      name: 'Website',
      price: '25000',
      features: [
        {
          _id: '66f144f9ab739db88a152273',
          name: 'Website',
          price: '25000',
          __v: 0
        }
      ],
      __v: 0
    },
    {
      _id: '66f3c1aec554aedb252b7265',
      name: 'ERP',
      type: 'Multiple',
      package: '',
      price: '150',
      features: [
        {
          _id: '66f3c1aec554aedb252b7262',
          name: 'Attendence',
          price: '100',
          __v: 0
        },
        {
          _id: '66f3c1aec554aedb252b7263',
          name: 'Transport',
          price: '50',
          __v: 0
        }
      ],
      __v: 0
    }
  ]

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
    // New property to track editing state
}

  interface ProductListProps {
    data: Product[],
  }
  
  export default function ProductListTable({ data }: ProductListProps) {
    const tableRef = React.useRef<HTMLDivElement>(null); // Reference to the table container
    const [productType, setProductType] = useState<string>("Single");
    const [expandedRows, setExpandedRows] = useState<string[]>([]); // Track expanded rows
  
    // Toggle row expansion
    const toggleExpandRow = (productName: string) => {
      if (expandedRows.includes(productName)) {
        setExpandedRows(expandedRows.filter((name) => name !== productName));
      } else {
        setExpandedRows([...expandedRows, productName]);
      }
    };

    useEffect(() => {
        console.log(data);
    }, [data]);
  
    return (
      <>
        {/* Product Type Selection Buttons */}
        <Box sx={{ P: 1, ml: 12, marginTop: "100px" }} color={"white"}>
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
  
        {/* Table for Product List */}
        <TableContainer
          sx={{
              borderRadius: 4,
              maxHeight: "65vh",
              maxWidth: "90%",
              
              overflow: "auto",
              margin: 'auto',
              mt: 2,
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
        //   component={Paper}
          ref={tableRef} // Attach ref to TableContainer
        >
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: "#03383D",
              color: "white",
            }}
            aria-label="product list table"
          >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}>
                  Product Name
                </TableCell>
                {productType === "Package" && (
                  <TableCell sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}>
                    Package Name
                  </TableCell>
                )}
                <TableCell sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}>
                  Product Price
                </TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {data
                .filter((product) => product.type === productType)
                .map((product) => (
                  <React.Fragment key={product.name}>
                    <TableRow>
                      {/* Expand/Collapse button at the beginning */}
                      <TableCell sx={{ color: "white", width: "50px" }}>
                        {(productType === "Multiple" || productType === "Package") && (
                          <IconButton
                            onClick={() => toggleExpandRow(product.name)}
                            sx={{ color: "white" }}
                          >
                            {expandedRows.includes(product.name) ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        )}
                      </TableCell>
  
                      <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
  
                      {/* Package Name Column for Package Type */}
                      {productType === "Package" && (
                        <TableCell sx={{ color: "white" }}>{product.package}</TableCell>
                      )}
  
                      <TableCell sx={{ color: "white" }}>{product.price}</TableCell>
                    </TableRow>
  
                    {/* Expanded Row for Features */}
                    {(productType === "Multiple" || productType === "Package") && (
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                          <Collapse
                            in={expandedRows.includes(product.name)}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box margin={2} sx={{ color: "white", padding: "10px 20px", backgroundColor: "#022529", borderRadius: 2 }}>
                              <Typography variant="h6" gutterBottom component="div">
                                Features:
                              </Typography>
                              <Divider sx={{ backgroundColor: "#4D9900", marginBottom: 2 }} />
                              {product.features?.map((feature, index) => (
                                <Box
                                  key={index}
                                  display="flex"
                                  justifyContent="space-between"
                                  sx={{ marginBottom: 1 }}
                                >
                                  <Typography variant="body1">{feature.name}</Typography>
                                  <Typography variant="body1">{feature.price}</Typography>
                                </Box>
                              ))}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  