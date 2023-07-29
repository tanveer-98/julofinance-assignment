import React, { useContext, useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import { IMovie } from "../../types";
import { FavMovieContext } from "../../context/FavMovie";
import { useNavigate } from "react-router-dom";

const Skeleton = ({ width, height, borderRadius, animationDuration } :any) => {
    const skeletonStyles = css`
      background-color: #f2f2f2;
      width: ${width || '100%'};
      height: ${height || '16px'};
      border-radius: ${borderRadius || '4px'};
      animation: pulse ${animationDuration || '1.5s'} infinite ease-in-out;
  
      @keyframes pulse {
        0% {
          opacity: 0.6;
        }
        50% {
          opacity: 0.4;
        }
        100% {
          opacity: 0.6;
        }
      }
    `;
  
    return <div className={skeletonStyles} />;
  };
  
  export default Skeleton;