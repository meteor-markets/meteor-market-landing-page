import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { softShadows, strongShadows } from "./shadows";
import typography from "./typography";

const baseOptions = {
  direction: "ltr",
  typography,
  overrides: {
    MuiListSubheader: {
      root: {
        fontSize: "15px",
        fontWeight: "600",
        color: "white",
        padding: "0 0px 0 10px",
      },
    },
    MuiAppBar:{
      colorPrimary:{
        backgroundColor:"transparent"
      }
    },
    MuiTabs:{
      flexContainer:{
        backgroundColor: '#2B2B2B',
        display:"inline-block",
        borderRadius:"10px",
        margin: "20px 20px",
      }
    },
    MuiTab:{
      root: {
        borderRadius:"10px",
        backgroundColor: '#2B2B2B',
        minHeight:"40px",
        '&$selected': {
          background: 'linear-gradient(-90deg, #FC4A1A, #FF9142)',
        }
      }
    },
    MuiTableContainer:{
      root:{
        borderRadius:"9px"
      }
    },
    MuiTableHead: {
      root: {
        // border: "1px solid #0B0B0F !important",
        // borderRadius:"9px"
      },
    },
    MuiDialogActions: {
      root: {
        justifyContent: "center",
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        padding: "15px",
        // border: "1px solid #BEF71E",
      },
      container: {
        backgroundColor: "#00000066",
      },
      paperWidthSm: {
        maxWidth: "470px",
        background: "#1C1C1C ",
        border: "1px solid #1C1C1C",
      },
    },
    MuiPickersCalendarHeader: {
      dayLabel: {
        color: "White",
      },
    },
    MuiPaper: {
      elevation24: {
        boxShadow: "none",
      },
      elevation1: {
        backgroundColor: "#f5f5f5",
      },
      root: {
        minWidth: "auto !important",
      },
    },

    MuiBackdrop: {
      root: {
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        zIndex: "-1",
        position: "fixed",
        background: "transparent",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        WebkitTapHighlightColor: "transparent",
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: "14px",
        color: "black",
      },
    },
    MuiMenu: {
      paper: {
        maxHeight: "297px !important",
        minWidth: "350px !important",
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        height: "100px",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#416654",
      },
    },
    MuiInput: {
      root: {
        paddingLeft: "5px",
      },
      underline: {
        "&:hover": {
          borderBottom: "transparent",
        },
        "&::after": {
          left: "0",
          right: "0",
          bottom: "0",
          content: '""',
          position: "absolute",
          transform: "scaleX(0)",
          transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
          borderBottom: "transparent !important",
          pointerEvents: "none",
        },
        "&::before": {
          left: "0",
          right: "0",
          bottom: "0",
          content: '"\\00a0"',
          position: "absolute",
          transition:
            "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderBottom: "transparent !important",
          pointerEvents: "none",
          "&:hover": {
            borderBottom: "transparent",
          },
        },
      },
    },
    MuiFormControl: {
      root: {
        width: "100%",
        // border: "1px solid black",
        borderRadius: "5px",
      },
      marginNormal: {
        marginTop: "0px",
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: "20px",
      },
    },
    MuiListItem: {
      gutters: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    MuiSlider: {
      mark: {
        width: 5,
        height: 5,
        borderRadius: "50%",
        border: "2px solid #fff",
        top: 9,
        backgroundColor: "#222",
        marginLeft: "-2px",
      },
      markActive: {
        width: 5,
        height: 5,
        borderRadius: "50%",
        border: "2px solid #EAB73B",
        top: 9,
        backgroundColor: "#EAB73B",
        marginLeft: "-2px",
      },
    },
    MuiButton: {
      containedSecondary: {
        background: "#fff !important",
        // border: "1px solid White",
        fontFamily: "'Saira Semi Condensed', sans-serif",
        color: "#000",
        height: "43px",
        padding: "10px 33px !important",
        fontSize: "14px !important",
        lineHeight: "21px",
        // marginRight: "10px",
        borderRadius: "5px",
        fontWeight: "600",
      },

      containedPrimary: {
        color: "white",
        height: "43px",
        padding: "10px 33px",
        fontSize: "15px !important",
        lineHeight: "21px",
        borderRadius: "5px",
        fontFamily: "'Saira Semi Condensed', sans-serif",
        background: "#0B0B0F !important",
        // border: "1px solid black",
        fontWeight: "600",
      },
      contained: {
        fontWeight: 500,
        padding: "5px 5px",
        background: "linear-gradient(90deg, #FF9142, #FC4A1A,#F7B733)",
        color: "#fff",
        fontFamily: "'Saira Semi Condensed', sans-serif",
        "&.Mui-disabled": {
          backgroundColor: "#7e7e7e70 !important",
          color: "#fff !important",
        },
        "&:hover": {
          background: "linear-gradient(90deg, #FC4A1A, #FF9142)",
        },
      },
      outlinedPrimary: {
        borderRadius: "50px",
        color: "#300760",
        fontWeight: 600,
        background: "red",
        padding: "5px 19px",
        border: "2px solid #300760",
        "&:hover": {
          backgroundColor: "#f30065",
          border: "2px solid #f30065",
          color: "#fff",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
      root: {
        "&.Mui-disabled": {
          color: "#fff9 !important",
        },
      },
      text: {
        fontFamily: "'Saira Semi Condensed', sans-serif",
      },
    },
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
    },
    MuiFormHelperText: {
      root: {
        marginTop: "1px",
      },
    },

    MuiRadio: {
      root: {
        color: "#C0BBBB",
      },
      colorSecondary: {
        "&$checked": {
          color: "#EAB73B",
        },
      },
    },

    //calendar date
    MuiPickersDay: {
      day: {
        color: "#fff !important",
      },
      daySelected: {
        backgroundColor: "black",
        fontSize: "0.80rem",
        color: "#fff",
      },
      dayDisabled: {
        color: "#cdcdcd",
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: "#fff",
      },
    },
    MuiTable: {
      root: {
        // border: "1px solid rgb(243 133 0 / 44%)",
        minWidth: "900px",
        border:"none",
        backgroundColor: "#1C1C1C"
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: "#fff",
      },
    },
    MuiPickerDTTabs: {
      tabs: {
        backgroundColor: "#416654",
      },
    },
    MuiPickersClockNumber: {
      clockNumber: {
        color: "White",
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "none",
        fontSize: "14px !important",
        fontWeight: "400",
        padding: "13px 20px",
        color: "#878787",
      },
      body: {
        color: "#fff",
      },
      head: {
        color: "#878787 !important",
        lineHeight: "1.5rem",
        fontWeight: "500 !important",
        background: "transparent",
      },
    },
    MuiSelect: {
      selectMenu: {
        height: "none",
      },
      outlined: {
        "&.MuiSelect-outlined": { fontSize: "13px" },
      },
      icon: {
        color: "White",
      },
    },
    MuiStep: {
      alternativeLabel: { marginBottom: "65px" },
    },
    MuiStepLabel: {
      root: {
        "&.MuiStepLabel-alternativeLabel": { flexDirection: "row" },
      },
      label: {
        "&.MuiStepLabel-alternativeLabel": {
          marginTop: "0px",
          marginLeft: "10px",
          fontSize: "14px",
          textAlign: "left",
        },
        "&.MuiStepLabel-completed": {
          color: "#EAB73B",
        },
        "&.MuiStepLabel-active": {
          color: "#EAB73B",
        },
      },
    },

    MuiIconButton: {
      root: {
        color: "#fff",
        padding: "6px",
      },
      edgeEnd: {
        marginRight: "0px",
      },
      label: {
        color: "#000",
      },
    },
    MuiPopover: {
      paper: {
        marginTop: "38px",
      },
    },
    MuiPickerDTToolbar: {
      toolbar: {
        background: "#416654",
      },
    },
  },
};

const themesOptions = [
  {
    name: "LIGHT",
    overrides: {},
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
    palette: {
      type: "light",
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: "#fff",
        white: "#000",
        light: "#C8FF00",
        blue: "#dfdfdf",
        dark: "#f5f5f5",
        paper: "#cfcccc",
        yellow: "#cc9c28",
        darkgrey: "#f8f7f7",
        wrapper: "#f5f5f5",
        black: "#fff",
        tabbed: "#cfcccc",
      },
      primary: {
        main: "#000000",
        blueMain: "#5D29FF",
        versa: "#fff",
        white: "#fff",
        dull: "#474444",
        recommended: "#000",
      },
      secondary: {
        main: "#000",
      },
      white: {
        main: "#000",
        dullWhite: "#ececec",
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
        white: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: "DARK",
    overrides: {
      MuiTableBody: {
        root: {
          // background: "linear-gradient(to bottom, rgb(255, 255, 255) 0%, rgb(250, 213, 168) 40%, rgb(249, 191, 121) 60%, rgb(247, 168, 75) 80%, rgb(245, 146, 27) 100%)",
        },
      },
      MuiOutlinedInput: {
        root: {
          // border: "1px solid black !important",
          background: "#416654",

          "&:hover": {
            borderColor: "black !important",
          },
          "& .Mui-focused": {
            "& .MuiOutlinedInput": {
              notchedOutline: {
                borderColor: "White !important",
              },
            },
          },
        },
        // borderColor:"#000",
        color: "#000",
        inputMultiline: {
          padding: "3px",
        },
        // .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline
        // .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline
        input: {
          padding: "13.5px 14px",
          // borderRadius: "10px",
          border: "none",
          // border: "1px solid black",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#fff",
          },
          "&:-internal-autofill-selected": {
            color: "#000",
          },
        },
        notchedOutline: {
          borderColor: "White !important",
          "& :hover": {
            borderColor: "#000 !important",
          },
        },
      },
      MuiInputBase: {
        fullWidth: {
          color: "#fff !important",
        },
        root: {
          // backgroundColor: " #1E1E1E",
          color: "#fff",
          // border: "1px solid black",
        },
        input: {
          fontSize: "13px",
          fontWeight: "400",
          color: "#fff",
          "&::placeholder": {
            color: "#fff",
          },
        },
        multiline: {
          // backgroundColor: "#1E1E1E",
          border: "none",
          borderRadius: "10px",
        },
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
    palette: {
      type: "dark",
      action: {
        active: "rgba(255, 255, 255, 0.54)",
        hover: "rgba(255, 255, 255, 0.04)",
        selected: "rgba(255, 255, 255, 0.08)",
        disabled: "rgba(255, 255, 255, 0.26)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        focus: "rgba(255, 255, 255, 0.12)",
      },
      background: {
        default: "#141516",
        white: "#fff",
        light: "#C8FF00",
        blue: "#141516",
        dark: "#222",
        paper: "#111010",
        yellow: "#EAB73B",
        black: "#000",
        wrapper: "#000",
        greyWhite: "#9A9A9A",
        darkgrey: "#1E1E1E",
        btnbg: "#2E2D2D",
        tabbed: "#1C1C1C",
      },
      primary: {
        main: "#000",
        versa: "#222",
        white: "#fff",
        dull: "#939393",
        recommended: "#9A9A9A",
      },
      secondary: {
        main: "#000",
      },
      white: {
        main: "#000",
        dullWhite: "#383636",
      },
      text: {
        primary: "#000",
        secondary: "#adb0bb",
      },
    },
    shadows: strongShadows,
  },
];

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(
    _.merge({}, baseOptions, themeOptions, { direction: config.direction })
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
