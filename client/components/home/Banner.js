import styled from "@emotion/styled";

const BannerContainer = styled.div`
  width: 100%;
  height: 190px;
  background-color: #2a9e96;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  & h1 {
    font-size: 3.4rem;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.4);
  }

  & p {
    font-size: 1.3rem;
  }
`;

const Banner = () => {
  return (
    <BannerContainer>
      <h1>Chimi</h1>
      <p>A place to share your knowledge</p>
    </BannerContainer>
  );
};

export default Banner;
