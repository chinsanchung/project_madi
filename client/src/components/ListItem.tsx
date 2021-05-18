import React, { useCallback } from "react";
// import { useHistory } from 'react-router-dom';
import styled from "styled-components";

const Item = styled.a`
  width: 100%;
  height: 100px;
`;

interface listItemProps {
  recipe_id: string;
  title: string;
  description: string;
  imgUrl: string;
}

function ListItem({ recipe_id, title, description, imgUrl }: listItemProps) {
  // const history = useHistory()
  const onMoveToDetail = useCallback(() => {
    console.log("recipe_id", recipe_id);
  }, [recipe_id]);

  return (
    <Item onClick={onMoveToDetail}>
      <img src={imgUrl} width="100px" alt={title} />
      <p>{title}</p>
      <p>{description}</p>
    </Item>
  );
}

export default ListItem;
