import React from "react";
import { useTheme } from "../../context/themeContext";
import "./SearchForm.scss";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import {
  Button,
  Popper,
  Paper,
  Stack,
  Grid,
  Typography,
  Fade,
} from "@mui/material";
import { Icon } from "../";


export default function SelectPersons({
quantity,
open,
cleanPersons,
sumTotalAndClose,
handleClick,
anchorEl,
setQuantity
}) {
    const { theme } = useTheme();
    const ageGroups = [
        { title: "Adultos", key: "age1" },
        { title: "Niños de 5 a 12 años", key: "age2" },
        { title: "Niños de 0 a 4 años", subtitle: "Sin asiento", key: "age3" },
        { title: "Niños de 0 a 4 años", subtitle: "Sin asiento", key: "age4" },
      ];

      const ageGroupsArea = ageGroups.map((group) => {
        return (
          <Grid
            container
            sx={{ padding: "10px", display: "flex", alignItems: "center" }}
            key={group.key}
          >
            <Grid
              item
              xs={7}
              sx={{ display: "flex", alignSelf: "center", padding: "5px" }}
              direction="column"
            >
              <Typography sx={{ p: 0 }}>{group.title}</Typography>
              {group.subtitle && (
                <Typography sx={{ p: 0, fontSize: "12px" }}>
                  {group.subtitle}
                </Typography>
              )}
            </Grid>
            <Grid item xs={2}>
              <Button
                sx={{ minWidth: "35px", padding: "6px" }}
                variant="contained"
                onClick={() =>
                  setQuantity({ ...quantity, [group.key]: quantity[group.key] - 1 })
                }
                disabled={quantity[group.key] === 0}
              >
                -
              </Button>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography paragraph={false} sx={{ p: 0, minWidth: "20px" }}>
                {quantity[group.key]}
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Button
                sx={{ minWidth: "35px", padding: "6px" }}
                variant="contained"
                className="counterButton"
                onClick={() =>
                  setQuantity({ ...quantity, [group.key]: quantity[group.key] + 1 })
                }
              >
                +
              </Button>
            </Grid>
          </Grid>
        );
      });

    return (
<div className="selectPeopleQuantity">
          <Icon code={"MdPerson"}></Icon>
          <Button
            disableRipple={true}
            disableElevation={true}
            endIcon={
              open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />
            }
            onClick={handleClick}
            sx={{
              minWidth: "30px",
              backgroundColor: theme === "dark" && "#35373A",
              color: theme === "dark" ? "#ffffff" : "#5F6368",
              paddingLeft: "0px",
              ".MuiSvgIcon-root": {
                color: "#1A73E8",
              },
              ".MuiButton-endIcon": {
                position: "absolute",
                right: "-5px",
              },
            }}
          >
            {quantity.total}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorEl}
            transition
            placement="bottom-start"
            keepMounted={true}
            sx={{
              zIndex: 1000,
              width: 315,
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  sx={{
                    backgroundColor: theme === "dark" && "#35373A",
                    color: theme === "dark" && "#ffffff",
                  }}
                >
                  {ageGroupsArea}
                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{ justifyContent: "end", padding: "0 10px 10px 10px" }}
                  >
                    <Button variant="text" onClick={cleanPersons}>
                      Cancelar
                    </Button>
                    <Button variant="text" onClick={sumTotalAndClose}>
                      Aceptar
                    </Button>
                  </Stack>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
    )
}