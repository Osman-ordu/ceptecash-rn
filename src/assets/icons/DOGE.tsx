import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from '@/types';

export function DOGEIcon({ width = 40, height = 40, color = '#C2A633' }: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 226.777 226.777"
      fill="none"
    >
      <G>
        <Path
          id="DOGE_alt_1_"
          d="M99.24-0.054c-15.421,0-65.182,0-65.182,0v100.975H7.287v24.732h26.772v100.975h75.95 c0,0,106.792,8.947,106.792-111.45C216.801-3.256,114.663-0.054,99.24-0.054z M108.262,184.725c-8.074,0-31.428,0-31.428,0v-59.071 h47.141v-24.732H76.834V41.849c0,0,18.768,0,29.972,0c11.204,0,67.582,4.509,67.668,74.148 C174.562,185.635,116.335,184.725,108.262,184.725z"
          fill={color}
        />
      </G>
    </Svg>
  );
}

