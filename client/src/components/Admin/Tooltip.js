import React from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
import { COLORS } from "../../contants";

const Tooltip = ({ action, children }) => {
  return (
    <Tippy duration={0} content={<Wrapper>{action}</Wrapper>}>
      {children}
    </Tippy>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.lightBackground};
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  border: 1px solid ${COLORS.darkest};
  border-radius: 6px;
  padding: 10px;
`;

export default Tooltip;
