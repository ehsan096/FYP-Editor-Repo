import React, { useEffect } from "react";
import * as d3 from "d3";
import "./rightbar.style.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fonts from "../data/font";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// import "bootstrap/dist/css/bootstrap.min.css";
import Colors from "../data/color";
import { makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    width: 150,
  },
  input: {
    width: 42,
  },
});

const Rightbar = ({ setCompanyName, svgText, setSvgText }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [color, setColor] = React.useState(false);
  const [fillColor, setFillColor] = React.useState("#21b6ae");
  const [formats, setFormats] = React.useState(() => ["bold", "italic"]);
  const [curve, setCurve] = React.useState("no");
  const [state, setState] = React.useState(false);

  const classes = useStyles();
  const [value, setValue] = React.useState(30);
  const [value1, setValue1] = React.useState(14);
  const [radiusX, setRadiusX] = React.useState(40);
  const [radiusY, setRadiusY] = React.useState(20);

  // useEffect(() => {
  //   // document.getElementById("name").value = svgText.LogoName;
  //   // d3.select("#fontfamily").text(svgText.FontFamily);
  //   //Text round button state
  //   setState(svgText.circular);
  //   setRadiusX(svgText.xRadius);
  //   setRadiusY(svgText.yRadius);
  //   //font-size
  //   setValue1(svgText.fontSize);
  //   setValue(svgText.letterSpacing);
  //   const arr = [svgText.bold, svgText.italic, svgText.underline];
  //   setFormats(arr);
  //   setCurve(svgText.textCurve);
  //   //Text Color
  //   setFillColor(svgText.textColor);
  // }, [svgText]);

  useEffect(() => {
    console.log("formates is > ", formats);
  }, [formats]);

  const handleXChange = (event, newValue) => {
    setRadiusX(newValue);
    setSvgText({
      ...svgText,
      xRadius: newValue,
    });
  };
  const handleYChange = (event, newValue) => {
    setRadiusY(newValue);
    setSvgText({
      ...svgText,
      yRadius: newValue,
    });
  };
  const handleCheck = (event) => {
    setSvgText({
      ...svgText,
      circular: event.target.checked,
    });
  };
  const handleValue1 = (event) => {
    setValue1(event.target.value === "" ? "" : Number(event.target.value));
    setSvgText({
      ...svgText,
      fontSize: event.target.value === "" ? "" : Number(event.target.value),
    });
  };
  const handleRadiusX = (event) => {
    setRadiusX(event.target.value === "" ? "" : Number(event.target.value));
    setSvgText({
      ...svgText,
      xRadius: event.target.value === "" ? "" : Number(event.target.value),
    });
  };
  const handleRadiusY = (event) => {
    setRadiusY(event.target.value === "" ? "" : Number(event.target.value));
    setSvgText({
      ...svgText,
      yRadius: event.target.value === "" ? "" : Number(event.target.value),
    });
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    setSvgText({
      ...svgText,
      letterSpacing:
        event.target.value === "" ? "" : Number(event.target.value),
    });
  };

  const handleBlur = () => {
    if (value1 < 8) {
      setValue(8);
      setSvgText({
        ...svgText,
        fontSize: 8,
      });
    } else if (value1 > 78) {
      setValue(78);
      setSvgText({
        ...svgText,
        fontSize: 78,
      });
    }
  };
  const handleBlur2 = () => {
    if (value < -5) {
      setSvgText({
        ...svgText,
        letterSpacing: -5,
      });
    } else if (value > 25) {
      setSvgText({
        ...svgText,
        letterSpacing: 25,
      });
    }
  };
  const handleBlur1 = () => {
    if (radiusX < 20) {
      setRadiusX(20);
      setSvgText({
        ...svgText,
        xRadius: 20,
      });
    } else if (radiusY < 20) {
      setRadiusY(20);
      setSvgText({
        ...svgText,
        yRadius: 20,
      });
    } else if (radiusX > 158) {
      setRadiusX(158);
      setSvgText({
        ...svgText,
        xRadius: 158,
      });
    } else if (radiusY > 158) {
      setRadiusY(158);
      setSvgText({
        ...svgText,
        yRadius: 158,
      });
    }
  };

  const handleCurve = (event, newAlignment) => {
    setCurve(newAlignment);
    setSvgText({
      ...svgText,
      textCurve: newAlignment,
    });
  };

  const handleFormat = (event, newFormats) => {
    var b = newFormats.find((e) => e === "bold");
    if (!b) {
      b = "200";
    }
    var i = newFormats.find((e) => e === "italic");
    if (!i) {
      i = "normal";
    }
    var u = newFormats.find((e) => e === "underline");
    if (!u) {
      u = "none";
    }
    setSvgText({
      ...svgText,
      bold: b,
      italic: i,
      underline: u,
    });

    console.log("newFormats > ", newFormats);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRadius = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
    // setColor(null);
  };
  return (
    <div className="Right-bar">
      <div className="Name">
        <label>Company Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={svgText.LogoName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            setSvgText({
              ...svgText,
              LogoName: e.target.value,
            });
          }}
        />
      </div>

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
      <div className="Font-Size">
        <Button
          aria-controls="menu"
          aria-haspopup="true"
          style={{ backgroundColor: "#21b6ae" }}
          onClick={handleRadius}
        >
          Circular Text
        </Button>
        <Menu
          id="menu"
          anchorEl={anchorE2}
          keepMounted
          open={Boolean(anchorE2)}
          onClose={handleClose}
        >
          <MenuItem>
            <FormControlLabel
              control={
                <Switch checked={svgText.circular} onChange={handleCheck} />
              }
              label="Text Round"
            />
          </MenuItem>
          <MenuItem>
            <div className="Align">
              <h3>Text Curve</h3>
              <Grid item>
                <ToggleButtonGroup
                  size="medium"
                  value={svgText.textCurve}
                  exclusive
                  onChange={handleCurve}
                >
                  <ToggleButton value="lower">
                    <ExpandMoreIcon fontSize="medium" />
                  </ToggleButton>

                  <ToggleButton value="upper">
                    <ExpandLessIcon fontSize="medium" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </div>
          </MenuItem>
          <MenuItem>
            <Typography id="input-slider" gutterBottom>
              X-Radius
            </Typography>
          </MenuItem>

          <MenuItem className={classes.root}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof value === "number" ? value : 20}
                  onChange={handleXChange}
                  aria-labelledby="input-X"
                />
              </Grid>
              <Grid item>
                <Input
                  className={classes.input}
                  value={svgText.xRadius}
                  margin="dense"
                  onChange={handleRadiusX}
                  onBlur={handleBlur1}
                  inputProps={{
                    step: 2,
                    min: 20,
                    max: 158,
                    type: "number",
                    "aria-labelledby": "input-X",
                  }}
                />
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem className={classes.root}>
            <Typography id="input-slider" gutterBottom>
              Y-Radius
            </Typography>
          </MenuItem>
          <MenuItem>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs width={200}>
                <Slider
                  value={typeof value === "number" ? value : 20}
                  onChange={handleYChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  className={classes.input}
                  value={svgText.yRadius}
                  margin="dense"
                  onChange={handleRadiusY}
                  onBlur={handleBlur1}
                  inputProps={{
                    step: 2,
                    min: 20,
                    max: 108,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </MenuItem>
        </Menu>
      </div>
      <div className="Font-Size">
        <h3>Font Size</h3>
        <Grid item>
          <Input
            className={classes.input}
            value={svgText.fontSize}
            margin="dense"
            onChange={handleValue1}
            onBlur={handleBlur}
            inputProps={{
              step: 2,
              min: 8,
              max: 78,
              type: "number",
            }}
          />
        </Grid>
      </div>
      <div className="line-spacing">
        <h3>Letter Spacing</h3>
        <Grid item>
          <Input
            className={classes.input}
            value={svgText.letterSpacing}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur2}
            inputProps={{
              step: 1,
              min: -5,
              max: 25,
              type: "number",
            }}
          />
        </Grid>
      </div>
      <ToggleButtonGroup
        value={[svgText.bold, svgText.italic, svgText.underline]}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton value="underline" aria-label="underline">
          <FormatUnderlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      <div className="text-color">
        <Button
          aria-controls="Color"
          aria-haspopup="true"
          id="fill"
          style={{ backgroundColor: svgText.textColor }}
          onClick={() => {
            setColor(!color);
          }}
        >
          Font-Color
        </Button>
        {color ? (
          <ul>
            {Colors.map((color) => {
              return (
                <div id="top" key={color.clr}>
                  {/* {console.log("options are " + color.clr)} */}

                  <li
                    style={{ backgroundColor: color.clr }}
                    onClick={(e) => {
                      setSvgText({
                        ...svgText,
                        textColor: e.target.style.backgroundColor,
                      });
                      setFillColor(e.target.style.backgroundColor);
                    }}
                  ></li>
                </div>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Rightbar;
