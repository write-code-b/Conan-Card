import styled from "styled-components";

export const CardWrapper = styled.div`
  &:after {
    border-color: ${(props) =>
      props.color[0] === "적"
        ? "#e53a40"
        : props.color[0] === "황"
        ? "#efdc05"
        : props.color[0] === "청"
        ? "#30a9de"
        : props.color[0] === "녹"
        ? "#5cab7d"
        : props.color[0] === "흑"
        ? "#090707"
        : "#ffffff"};
    border-top-color: ${(props) =>
      props.color[1] === "적"
        ? "#e53a40"
        : props.color[1] === "황"
        ? "#efdc05"
        : props.color[1] === "청"
        ? "#30a9de"
        : props.color[1] === "녹"
        ? "#5cab7d"
        : props.color[1] === "흑"
        ? "#090707"
        : props.color[1] === "백"
        ? "#ffffff"
        : ""};
  }
`;
