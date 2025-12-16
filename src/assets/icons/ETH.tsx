import React from 'react';
import Svg, { G, Polygon } from 'react-native-svg';
import { IconProps } from '@/types';

export function ETHIcon({ width = 40, height = 40, color = '#627EEA' }: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 226.777 226.777"
      fill="none"
    >
      <G>
        <Polygon
          points="112.553,157 112.553,86.977 44.158,116.937"
          fill={color}
        />
        <Polygon
          points="112.553,82.163 112.553,-0.056 46.362,111.156"
          fill={color}
        />
        <Polygon
          points="116.962,-0.09 116.962,82.163 184.083,111.566"
          fill={color}
        />
        <Polygon
          points="116.962,86.977 116.962,157.002 185.405,116.957"
          fill={color}
        />
        <Polygon
          points="112.553,227.406 112.553,171.085 44.618,131.31"
          fill={color}
        />
        <Polygon
          points="116.962,227.406 184.897,131.31 116.962,171.085"
          fill={color}
        />
      </G>
    </Svg>
  );
}

