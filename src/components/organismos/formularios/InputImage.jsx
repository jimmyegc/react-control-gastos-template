import styled from "styled-components";
import { useRef } from "react";

export function InputImage({ value, onUpload, disabled }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file && onUpload) {
      await onUpload(file);
    }
  };

  return (
    <Container onClick={handleClick} disabled={disabled}>
      <div className="image-wrapper">
        {value ? (
          <img src={value} alt="Foto de perfil" />
        ) : (
          <span className="placeholder">Subir foto</span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 3px solid #000;
  border-radius: 0.5em;
  background: ${({ theme }) => theme.bgtotal};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  overflow: hidden;
  box-shadow: 0.2em 0.2em #000;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "translate(-0.1em, -0.1em)")};
    box-shadow: ${({ disabled }) =>
      disabled ? "0.2em 0.2em #000" : "0.3em 0.3em #000"};
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.bg};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    font-weight: 700;
    text-align: center;
  }

  input[type="file"] {
    display: none;
  }
`;
