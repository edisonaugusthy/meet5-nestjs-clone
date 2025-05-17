"use client";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
} from "@mui/material";
import { forwardRef } from "react";

interface ButtonProps extends MuiButtonProps {
  fullWidth?: boolean;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "fullWidth",
})<ButtonProps>(({ theme, fullWidth }) => ({
  borderRadius: 20,
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontWeight: 600,
  boxShadow: "none",
  color: theme.palette.text.primary,
  width: fullWidth ? "100%" : "auto",
  "&:hover": {
    boxShadow: "none",
  },
}));

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <StyledButton ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export default Button;
