import React from 'react';
import styles from '@styles/BubbleButton.module.css';

const BubbleButton = ({ 
  children, 
  className = '', 
  bubbleColor = '#7d2ae8',
  as: Component = 'button',
  ...rest 
}) => {
  // If no className is provided, defaults to the base bubble button styling
  const baseClasses = className ? className : 'px-[22px] py-[10px] rounded-[6px] text-white bg-[#7d2ae8] border-none cursor-pointer';
  
  return (
    <Component 
      className={`${styles.button} ${baseClasses}`}
      style={{ '--bubble-color': bubbleColor }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default BubbleButton;
