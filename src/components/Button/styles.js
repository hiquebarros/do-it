import styled from "styled-components"

export const Container = styled.button`
background: ${(props) => (props.whiteSchema ? "#f5f5f5" : "#0C0D0D")};
color: ${(props) => (props.whiteSchema ? "#0C0D0D" : "#f5f5f5")};
height: 45px;
border-radius: 8px;
border: 2px solid var(--black);
font-family: "Roboto Mono", monospace;
margin-top: 16px;
width: 100%;

:hover{
    border: 2px solid #c85311;
}
`