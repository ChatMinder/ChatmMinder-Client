import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';

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

const cancel = require('../assets/cancel.png');

const ModalItem = ({
  //handleNewTag,
  isModalVisible,
  title,
  //colors,
  toggleModal,
  setStateValue,
}) => {
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
    console.log('subTitle:', subTitle), () => {};
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
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const response = await axios.post(
        'https://api.chatminder.app/tags',
        formData,
        {
          headers: {
            Authorization:
              'Bearer ' +
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
          },
        }
      );
      console.log('response >>', response.data);
    } catch (error) {
      console.log('Error >>', error);
    }
  };

  const handleEdit = async (id) => {
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const response = await axios.patch(
        `https://api.chatminder.app/tags/${id}`,
        formData,
        {
          headers: {
            Authorization:
              'Bearer ' +
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
          },
        }
      );
      console.log('response >>', response.data);
    } catch (error) {
      console.log('Error >>', error);
    }
  };

  return (
    <StyledSafeAreaView>
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
              <ImgItem source={cancel} />
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
