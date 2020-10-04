import useSWR from "swr";
import styled from "@emotion/styled";
import Link from "next/link";

import Error from "../common/Error";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";

const PopularContainer = styled.div`
  background-color: #f3f3f3;
  min-height: 150px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
`;

const TagLink = styled.a`
  cursor: pointer;
  background-color: RGBA(104, 112, 119, 0.7);
  color: RGBA(255, 255, 255, 0.7);
  transition: 0.3s;

  &:hover {
    background-color: RGBA(104, 112, 119, 1);
    color: RGBA(255, 255, 255, 1);
  }
`;

const PopularTags = () => {
  const { data, error } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher);

  return (
    <PopularContainer>
      <Title className="text-center pt-2">Popular Tags</Title>
      {error && <Error error={error} />}
      {!data && <p className="text-center mt-3">Loading...</p>}

      {data && (
        <div className="d-flex flex-wrap  px-2">
          {data.map(({ id, tag }) => (
            <Link key={id} href={`/?tag=${tag}`} as={`/?tag=${tag}`}>
              <TagLink className="px-2 py-1 m-1 rounded-pill">
                <span>{tag}</span>
              </TagLink>
            </Link>
          ))}
        </div>
      )}
    </PopularContainer>
  );
};

export default PopularTags;
