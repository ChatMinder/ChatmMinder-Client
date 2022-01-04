import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import palette from '../palette';

const image = require('../assets/uploadImage.png');
const link = require('../assets/link.png');
const emptyBookmark = require('../assets/emptyBookmark.png');
const fulledBookmark = require('../assets/fulledBookmark.png');

const HeaderButton = ({ type }) => {
  const { id, category, isSelected } = type;
  console.log(type);

  return category === 'all' ? (
    <StyledBtn
      onPress={() => {
        onToggle(0);
      }}
    >
      <Text>전체</Text>
    </StyledBtn>
  ) : category === 'image' ? (
    <StyledBtn>
      <ImageItem source={image} />
    </StyledBtn>
  ) : category === 'link' ? (
    <StyledBtn>
      <ImageItem source={link} width={20} />
    </StyledBtn>
  ) : category === 'text' ? (
    <StyledBtn>
      <Text>가</Text>
    </StyledBtn>
  ) : (
    <StyledBtn>
      <ImageItem source={emptyBookmark} />
    </StyledBtn>
  );
};

export default HeaderButton;

const StyledBtn = styled.TouchableOpacity`
  border: 1px solid ${palette.borderGray};
  border-radius: 8px;
  width: 40px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const ImageItem = styled.Image`
  width: ${(props) => props.width || '15'}px;
  height: ${(props) => props.height || '15'}px;
`;