import styled from "styled-components";
import { layout, LayoutProps } from "styled-system";

type ColumnProps = LayoutProps

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  ${layout}
`