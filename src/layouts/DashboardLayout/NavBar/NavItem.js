import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, Collapse, ListItem, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
const useStyles = makeStyles((theme) => ({
  item: {
    display: "block",
    paddingTop: "6px",
    paddingBottom: 0,
  },
  itemLeaf: {
    display: "flex",
    paddingTop: "0px",
    paddingBottom: 0,
  },
  button: {
    color: "white !important",
    padding: "10px 0",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  buttonLeaf: {
    color: "white",
    padding: "12px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    fontSize: "18px",
    width: "100%",
    // borderLeft: "solid 8px transparent",
    borderRadius: "2px",
    "&:hover": {
      background: "linear-gradient(90deg, #FF9142, #FC4A1A,#F7B733)",
      color: "white",
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },

  active: {
    // background: "White",
    background: "linear-gradient(90deg, #FF9142, #FC4A1A,#F7B733)",
    color: "#fff",
    // borderRight: "3px solid #000",
    fontWeight: "600",
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: "00e0b0",
    },
  },
}));

const NavItem = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProp,
  title,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}
      >
        <Button
          className={classes.button}
          onClick={handleToggle}
          style={{ padding: "8px 17px" }}
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        exact
        style={style}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
        {Info && <Info />}
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
