import React, { useEffect } from "react";
import "./rightbar.style.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fonts from "../data/font";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Box, Slider } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { ColorPicker } from "material-ui-color";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    width: 150,
  },
  input: {
    width: 42,
  },
});

const Rightbar = ({ svgText, setSvgText }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [decoration, setDecoration] = React.useState(false);
  // const [italicc, setItalicc] = React.useState(false);
  // const [fontWeight, setFontWeight] = React.useState(300);
  const [fontDecoration, setFontDecoration] = React.useState("underline");

  const classes = useStyles();
  // const [value, setValue] = React.useState(30);
  // const [value1, setValue1] = React.useState(14);
  // const [sliderOffset, setSliderOffset] = React.useState(0);
  // const [sliderBlur, setSliderBlur] = React.useState(5);
  // const [sliderOpacity, setSliderOpacity] = React.useState(1);
  // const [sliderLineHeight, setsliderLineHeight] = React.useState(20);
  // const [sliderBorderWidth, setSliderBorderWidth] = React.useState(1);

  const handleDecoration = (event) => {
    setFontDecoration(event.target.value);

    event.target.value === "underline"
      ? setSvgText({
          ...svgText,
          [event.target.value]: true,
          lineThrough: false,
          overLine: false,
        })
      : event.target.value === "overLine"
      ? setSvgText({
          ...svgText,
          [event.target.value]: true,
          underline: false,
          lineThrough: false,
        })
      : setSvgText({
          ...svgText,
          [event.target.value]: true,
          underline: false,
          overLine: false,
        });
  };

  useEffect(() => {
    // document.getElementById("name").value = svgText.LogoName;
    // d3.select("#fontfamily").text(svgText.FontFamily);
    //font-size
    if (svgText.underline || svgText.overLine || svgText.lineThrough) {
      setDecoration(true);
      svgText.underline
        ? setFontDecoration("underline")
        : svgText.overLine
        ? setFontDecoration("overLine")
        : setFontDecoration("lineThrough");
    } else {
      setDecoration(false);
    }
    console.log("rightbar rendering", svgText);
    //Text Color
  }, [svgText]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setColor(null);
  };
  return (
    <div className="Right-bar">
      {svgText.type === "i-text" ? (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            id="fontfamily"
            style={{ backgroundColor: "#21b6ae" }}
            onClick={handleClick}
          >
            {svgText.FontFamily}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {Fonts.map((font) => {
              return (
                <MenuItem
                  key={font}
                  style={{ fontFamily: font }}
                  onClick={(e) => {
                    setSvgText({
                      ...svgText,
                      FontFamily: font,
                    });
                    setAnchorEl(null);
                  }}
                >
                  {font}
                </MenuItem>
              );
            })}
          </Menu>
          <div className="shadow">
            <h4>Font Wieght</h4>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={
                svgText.bold === "bold"
                  ? 900
                  : svgText.bold === "normal"
                  ? 300
                  : svgText.bold
              }
              label="Font Weight"
              onChange={(event) => {
                setSvgText({
                  ...svgText,
                  bold: event.target.value,
                });
              }}
            >
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={400}>400</MenuItem>
              <MenuItem value={600}>600</MenuItem>
              <MenuItem value={700}>700</MenuItem>
              <MenuItem value={800}>800</MenuItem>
              <MenuItem value={900}>900</MenuItem>
            </Select>
          </div>
          <div>
            <div className="shadow">
              <h3> Italic</h3>
              <FormControlLabel
                control={
                  <Switch
                    checked={svgText.italic === "italic" ? true : false}
                    onChange={() => {
                      // setItalicc(!italicc);
                      svgText.italic === "italic"
                        ? setSvgText({
                            ...svgText,
                            italic: "normal",
                          })
                        : setSvgText({
                            ...svgText,
                            italic: "italic",
                          });
                    }}
                    name="Italic"
                  />
                }
              />
            </div>
            <div className="shadow">
              <h3> Decoration</h3>
              <FormControlLabel
                control={
                  <Switch
                    checked={decoration}
                    onChange={() => {
                      setDecoration(!decoration);

                      decoration
                        ? setSvgText({
                            ...svgText,
                            underline: false,
                            overLine: false,
                            lineThrough: false,
                          })
                        : setSvgText({
                            ...svgText,
                            underline: true,
                          });
                    }}
                    name="Decoration"
                  />
                }
              />
            </div>
            {decoration ? (
              <div className="shadow">
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select1"
                  value={fontDecoration}
                  label="Decoration"
                  onChange={handleDecoration}
                >
                  <MenuItem value={"underline"}>Underline</MenuItem>
                  <MenuItem value={"overLine"}>OverLine</MenuItem>
                  <MenuItem value={"lineThrough"}>Line Through</MenuItem>
                </Select>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="shadow">
            <h3>Font Size</h3>
            <Grid item>
              <Input
                className={classes.input}
                value={svgText.fontSize}
                margin="dense"
                onChange={(event) => {
                  setSvgText({
                    ...svgText,
                    fontSize:
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value),
                  });
                }}
                inputProps={{
                  step: 2,
                  min: 8,
                  max: 78,
                  type: "number",
                }}
              />
            </Grid>
          </div>
          <div className="shadow">
            <h3>Letter Spacing</h3>
            <Grid item>
              <Input
                className={classes.input}
                value={svgText.letterSpacing}
                margin="dense"
                onChange={(event) => {
                  setSvgText({
                    ...svgText,
                    letterSpacing:
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value),
                  });
                }}
                inputProps={{
                  step: 3,
                  min: -5,
                  max: 225,
                  type: "number",
                }}
              />
            </Grid>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="shadow">
        <h3>Color</h3>
        <ColorPicker
          value={svgText.textColor}
          onChange={(value) => {
            setSvgText({
              ...svgText,
              textColor: value.css.backgroundColor,
            });
          }}
        />
      </div>

      <div className="shadow1">
        <Box sx={{ width: 180, margin: 8 }}>
          <h4>Border Width</h4>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={svgText.borderWidth}
                onChange={(event, newValue) => {
                  console.log("NewValue of Borderwidth > ", newValue);
                  setSvgText({
                    ...svgText,
                    borderWidth: newValue,
                  });
                }}
                min={0}
                step={1}
                max={20}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
      <div className="TextColor">
        <h4>Border Color</h4>
        <ColorPicker
          value={svgText.borderColor}
          onChange={(value) => {
            setSvgText({
              ...svgText,
              borderColor: value.css.backgroundColor,
            });
          }}
        />
      </div>

      {svgText.type === "i-text" ? (
        <div className="shadow1">
          <Box sx={{ width: 180, margin: 8 }}>
            <h4>Line Height</h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={svgText.lineHeight}
                  onChange={(event, newValue) => {
                    setSvgText({
                      ...svgText,
                      lineHeight: newValue,
                    });
                  }}
                  min={0}
                  step={2}
                  max={60}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        ""
      )}
      <div className="shadow1">
        <Box sx={{ width: 180, margin: 8 }}>
          <h4>Opacity</h4>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={svgText.opacity}
                onChange={(event, newValue) => {
                  setSvgText({
                    ...svgText,
                    opacity: newValue,
                  });
                }}
                min={0}
                step={0.1}
                max={1}
              />
            </Grid>
          </Grid>
        </Box>
      </div>

      <div className="shadow-container">
        <div className="shadow">
          <h3>Shadow</h3>
          <FormControlLabel
            // label="Text Shadow"
            // labelPlacement="start"
            control={
              <Switch
                checked={svgText.shadow}
                onChange={() =>
                  setSvgText({
                    ...svgText,
                    shadow: !svgText.shadow,
                  })
                }
                name="Shadow"
              />
            }
          />
        </div>
        {svgText.shadow ? (
          <Box sx={{ width: 180, margin: 8 }}>
            {/* <Typography id="input-slider" gutterBottom> */}
            <h4>Offset</h4>
            {/* </Typography> */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={svgText.offsetX}
                  onChange={(event, newValue) => {
                    setSvgText({
                      ...svgText,
                      offsetX: newValue,
                      offsetY: newValue,
                    });
                  }}
                  min={-40}
                  step={2}
                  max={40}
                />
              </Grid>
            </Grid>
            {/* <Typography id="input-slider" gutterBottom> */}
            <h4>Blur</h4>
            {/* </Typography> */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={svgText.blurr}
                  onChange={(event, newValue) => {
                    setSvgText({
                      ...svgText,
                      blurr: newValue,
                    });
                  }}
                  min={0}
                  step={1}
                  max={12}
                />
              </Grid>
            </Grid>
            <div className="TextColor">
              <h4>Shadow Color</h4>

              {console.log("Shadow color in rightbar", svgText.shadowColor)}
              <ColorPicker
                value={svgText.shadowColor}
                onChange={(value) => {
                  setSvgText({
                    ...svgText,
                    shadowColor: value.css.backgroundColor,
                  });
                }}
              />
            </div>
          </Box>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Rightbar;
