import styled from "@emotion/styled";

const SectionContainer = styled.div`
  margin: auto;
  padding: 0 15px;

  @media (min-width: 544px) {
    max-width: 576px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 940px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const Container = ({ children, className }) => {
  return <SectionContainer className={className}>{children}</SectionContainer>;
};

export default Container;
