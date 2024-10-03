import { Box, Dialog, IconButton, Slide } from "@mui/material";
import React, { useState } from "react";
import { SlideProps } from "@mui/material";
import { Close } from "@mui/icons-material";
import ProductListTable from "./ProductListTable";
import axios from "axios";
import { baseURL } from "@/Constants/constants";


interface ProductListProps {
    open: boolean;
    show: (value: boolean) => void;
}

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

const Transition = React.forwardRef(function Transition(
    props: SlideProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function ProductList({ open, show }: ProductListProps) {

    const [products, setProducts] = useState<Product[]>([]);

    const setVhProperty = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    React.useEffect(() => {
        setVhProperty();
        window.addEventListener("resize", setVhProperty);
        return () => {
          window.removeEventListener("resize", setVhProperty);
        };
    }, []);

    React.useEffect(() => {
        (async function(){
            try {
                const { data } = await axios.get(`${baseURL}/product`);
                console.log(data);
                setProducts(data);
            } catch(e) {
                console.log('error while fetching', e);
            }
        })();
    }, []);

    const handleClose = () => {
        show(false);
      };

    return (
        <>
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
          <ProductListTable data={products} />
        </Box>
        </Dialog>
        </React.Fragment>
        </>
    )
}