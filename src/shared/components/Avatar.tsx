"use client";
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from "@mui/material";
import { forwardRef } from "react";

interface AvatarProps extends MuiAvatarProps {
  name?: string;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const stringToColor = (string: string): string => {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, src, alt, ...props }, ref) => {
    const displayName = name || alt || "";

    return (
      <MuiAvatar
        ref={ref}
        src={src}
        alt={alt}
        {...(displayName &&
          !src && {
            sx: {
              bgcolor: stringToColor(displayName),
              ...props.sx,
            },
            children: getInitials(displayName),
          })}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
