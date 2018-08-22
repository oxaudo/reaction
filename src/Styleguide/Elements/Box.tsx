import { color, space } from "@artsy/palette"
// @ts-ignore
import React from "react"
import { media } from "styled-bootstrap-grid"
import styled, { css } from "styled-components"
import {
  background,
  BackgroundProps,
  bottom,
  BottomProps,
  color as styledColor,
  ColorProps,
  display,
  DisplayProps,
  height,
  HeightProps,
  left,
  LeftProps,
  maxWidth,
  MaxWidthProps,
  position,
  PositionProps,
  right,
  RightProps,
  space as styledSpace,
  SpaceProps,
  textAlign,
  TextAlignProps,
  top,
  TopProps,
  width,
  WidthProps,
  zIndex,
  ZIndexProps,
} from "styled-system"
import { Flex, FlexProps } from "./Flex"

export interface BorderBoxProps
  extends FlexProps,
    SpaceProps,
    MaxWidthProps,
    WidthProps,
    HeightProps {
  hover?: boolean
}

export const BorderBox = styled(Flex).attrs<BorderBoxProps>({})`
  border: 1px solid ${color("black10")};
  border-radius: 2px;
  padding: ${space(2)}px;
  ${styledSpace};
  ${maxWidth};
  ${width};
  ${height};
  ${({ hover }) =>
    hover &&
    css`
      :hover {
        border-color: ${color("black60")};
      }
    `};
`

export const StackableBorderBox = styled(BorderBox)`
  :not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  :not(:last-child) {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${media.sm`
    padding: ${space(3)}px;
    ${styledSpace};
  `};
`

export interface BoxProps
  extends DisplayProps,
    SpaceProps,
    WidthProps,
    MaxWidthProps,
    HeightProps,
    ColorProps,
    TextAlignProps,
    PositionProps,
    TopProps,
    BottomProps,
    LeftProps,
    RightProps,
    LeftProps,
    BottomProps,
    PositionProps,
    BackgroundProps,
    ZIndexProps {}
export const Box = styled.div.attrs<BoxProps>({})`
  ${styledSpace};
  ${display};
  ${width};
  ${height};
  ${position};
  ${top};
  ${right};
  ${bottom};
  ${left};
  ${styledColor};
  ${textAlign};
  ${maxWidth};
  ${background};
  ${zIndex};
`
