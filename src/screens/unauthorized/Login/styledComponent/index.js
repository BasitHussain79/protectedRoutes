import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const Form = styled.form`
  background-color: #0170d0;
  background-image: linear-gradient(160deg, #0093e9 0%, #0170d0 100%);

  color: #fafafa;
  padding: 3rem 3rem;
  width: 35rem;
  border-radius: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const MainHeading = styled.h3`
  font-size: 2.5rem;
`;

export const WarningText = styled.p`
  font-size: 1.2rem;
  color: #DC1E1E !important;
  width: 100%;
  font-weight: 400;
  text-align: start;
  margin-left: 2px;
  margin-bottom: 0px;
  visibility: ${(props) => props.visibility || 'visible'};
  margin-left: ${(props) => props.ml && props.ml};
  margin-bottom: ${(props) => props.mb && props.mb};
  margin-top: ${(props) => (props.mt ? props.mt : '0.5rem')};
`;