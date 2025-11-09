import styled from "styled-components";
import { HashLoader } from "react-spinners";
import { 
  useOperaciones,
  useThemeContext,
 } from "../../index";

export function SpinnerLoader() {
  const { themeStyle } = useThemeContext();  
  const { colorCategoria } = useOperaciones();
  
  return (
    <Container $background={themeStyle.bgtotal}>
      <HashLoader color={colorCategoria} size={200}/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: ${(props) => props.$background};
  transform: all 0.3s;
`;
