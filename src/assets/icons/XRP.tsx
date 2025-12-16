import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from '@/types';

export function XRPIcon({ width = 40, height = 40, color = '#23292F' }: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G>
        <Path
          id="primary"
          d="M19,3,12.74,9.68a1,1,0,0,1-1.48,0L5,3"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="primary-2"
          d="M19,21l-6.26-6.68a1,1,0,0,0-1.48,0L5,21"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </G>
    </Svg>
  );
}

