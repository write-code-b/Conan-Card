import * as React from "react";
import { useIsMobile } from "../state/hooks/useIsMobile";
import { useScroll } from "../state/hooks/useScroll";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const drawerBleeding = 0;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.default,
  }),
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[900],
  }),
}));

export default function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const isMobile = useIsMobile();
  const { y } = useScroll();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button
          id="drawerOpenButton"
          className={isMobile ? (y < 300 ? "hidden" : "") : ""}
          onClick={toggleDrawer(true)}
          sx={{
            position: "fixed",
            bottom: "70px",
            right: "10px",
            width: "45px",
            height: "45px",
            minWidth: "40px",
            zIndex: "1",
            borderRadius: "50%",
            backgroundColor: "#e53a40",
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          }}
        ></Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -50,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {props.favoritesCard.length} / 30
          </Typography>
        </StyledBox>
        <StyledBox sx={{ px: 2, pb: 2, height: "100%", overflow: "auto" }}>
          <div id="drawerCardList" className={isMobile ? "mobile" : "pc"}>
            {props.favoritesCard}
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
