import React, { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  children?: ReactNode;
}

const Cards: React.FC<CardProps> = ({ width, height, children, className, ...rest }) => {
  const cardStyle = {
    width: width,
    height: height,
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    // marginTop: "10px",
    boxShadow: "0px 3px 6px 0px #ddd",
  };

  return (
    <div style={cardStyle} className={className} {...rest}>
      {children}
    </div>
  );
};

export default Cards;
