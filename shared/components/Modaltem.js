import React, { useState, useEffect } from 'react';
import {
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PostTag, PatchTag } from '../API';

import {
  StyledSafeAreaView,
  StyledModalContainer2,
  StyledModalGradeWrapper,
  StyledModalGradeText,
  InputBox,
  ColorBox,
  ColorItem,
  CloseButton,
  ClosedBox,
  TitleBox,
} from '../styles/ModalStyle';
import { TextSize } from '../styles/FontStyle';
import TextR from './TextR';
import TextB from './TextB';
import palette from '../palette';

import { ImgItem, ButtonBox } from '../styles/CategoryStyle';
import { FontStyle } from '../styles/FontStyle';

import Cancel from '../assets/cancel.svg';
import styled from 'styled-components/native';

const ModalItem = ({ isModalVisible, title, toggleModal, setStateValue }) => {
  const token = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const SendData = () => {
    setStateValue(subTitle);
  };

  useEffect(() => {
    // {
    //   title.title ? setSubTitle(title.title) : setSubTitle('');
    // }
    //console.log('title: ', title);
    //console.log('subTitle:', subTitle)
    () => {};
  }, [subTitle, title.title]);

  const [colors, setColors] = useState([
    {
      id: 0,
      colorValue: `${palette.blue}`,
      colorName: 'blue',
      isSelected: false,
    },
    {
      id: 1,
      colorValue: `${palette.lightBlue}`,
      colorName: 'lightBlue',
      isSelected: false,
    },
    {
      id: 2,
      colorValue: `${palette.lightGreen}`,
      colorName: 'lightGreen',
      isSelected: false,
    },
    {
      id: 3,
      colorValue: `${palette.green}`,
      colorName: 'green',
      isSelected: false,
    },
    {
      id: 4,
      colorValue: `${palette.blueGreen}`,
      colorName: 'blueGreen',
      isSelected: false,
    },
    {
      id: 5,
      colorValue: `${palette.purple}`,
      colorName: 'purple',
      isSelected: false,
    },
    {
      id: 6,
      colorValue: `${palette.pink}`,
      colorName: 'pink',
      isSelected: false,
    },
    {
      id: 7,
      colorValue: `${palette.orange}`,
      colorName: 'orange',
      isSelected: false,
    },
    {
      id: 8,
      colorValue: `${palette.lightOrange}`,
      colorName: 'lightOrange',
      isSelected: false,
    },
    {
      id: 9,
      colorValue: `${palette.yellow}`,
      colorName: 'yellow',
      isSelected: false,
    },
  ]);

  // const handleColor = (idx) => {
  //   setColors(
  //     colors.map((color) =>
  //       color.id === idx ? { ...color, isSelected: !color.isSelected } : color
  //     )
  //   );
  //   console.log(colors);
  // };

  const handleNewTag = async () => {
    setLoading(true);
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const postTagRes = await PostTag(token, formData);
      console.log('postTagRes 성공: ', postTagRes.data);
    } catch (error) {
      console.log('postTagRes 실패: ', error);
    }
    setLoading(false);
  };

  const handleEdit = async (id) => {
    setLoading(true);
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const patchTagRes = await PatchTag(token, formData, id);
      console.log('patchTag 성공: ', patchTagRes.data);
    } catch (error) {
      console.log('patchTag 실패: ', error);
    }
    setLoading(false);
  };

  return (
    <StyledSafeAreaView>
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}

      <Modal
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StyledModalContainer2>
          <ClosedBox>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}
            >
              <Cancel />
            </TouchableOpacity>
          </ClosedBox>
          <TitleBox>
            <TextR>
              <TextSize color={palette.gray2}>제목</TextSize>
            </TextR>
          </TitleBox>

          <TitleBox marginBottom="30">
            <TextInput
              placeholder="태그를 입력해주세요"
              type="text"
              onChangeText={(text) => {
                setSubTitle(text);
              }}
              //value={subTitle}
            />

            <InputBox />
          </TitleBox>
          <TitleBox>
            <TextR>
              <TextSize color={palette.gray2}>태그 컬러</TextSize>
            </TextR>
          </TitleBox>
          <ColorBox>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.id}
                onPress={() => {
                  //handleColor(color.id);
                  setSelectedColor(color.colorValue);
                  console.log(color.colorName);
                }}
              >
                <ColorItem backgroundColor={color.colorValue} />
              </TouchableOpacity>
            ))}
          </ColorBox>

          <CloseButton
            onPress={() => {
              SendData();
              //handleNewTag();
              toggleModal();
              {
                title.id ? handleEdit(title.id) : handleNewTag();
              }
            }}
          >
            <TextB>
              <TextSize fontSize="18" color={palette.white}>
                완료
              </TextSize>
            </TextB>
          </CloseButton>
        </StyledModalContainer2>
      </Modal>
    </StyledSafeAreaView>
  );
};

export default ModalItem;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SpinnerWrapper = styled.View`
  position: absolute;
  left: ${SCREEN_WIDTH * 0.5 - 18}px;
  bottom: ${SCREEN_HEIGHT * 0.5 - 18}px;
  z-index: 10;
`;
