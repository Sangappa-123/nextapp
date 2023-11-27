import React, { useState } from "react";
import styles from "./Tooltip.module.scss";
import { FaInfoCircle } from "react-icons/fa";

interface TooltipProps {
  text: any;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className={styles.tooltipContainer}>
      <div
        className={styles.tooltipTrigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaInfoCircle />
      </div>
      {isTooltipVisible && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default Tooltip;
