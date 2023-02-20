import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

export const PlusButton = () => {
  return (
    <Wrapper>
      <Button className="square bg-primary rounded-pill plus-btn">
        <FiPlus /> Add sheet
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .plus-btn {
    background: var(--primary-600);
    margin-left: 1.5rem;
    min-width: 8rem;
  }
`;

export default PlusButton;
