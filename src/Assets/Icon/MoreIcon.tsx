import React from "react";

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  size?: number | string;
};

const MoreIcon = ({ color, size = 24, ...props }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 16.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm0-4.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm0-4.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z"
      fill={color || "currentColor"}
    />
  </svg>
);

export { MoreIcon };