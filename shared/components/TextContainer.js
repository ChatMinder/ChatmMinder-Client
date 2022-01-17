import React, { useEffect, useState } from 'react';
import RNUrlPreview from 'react-native-url-preview';
import {
  Text,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import palette from '../palette';
import TextR from './TextR';
import TextB from './TextB';
import { TextSize } from '../styles/FontStyle';
import { DeleteMemo, PostBookmark } from '../API';
import { bookmarkMemo, delMemo } from '../reducers/memo';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  TagBox,
  BookmarkItem,
  BookmarkBox2,
  TextItem,
  BoxContainer,
} from '../styles/TextContainerStyle';

import EmptyBookmark from '../assets/emptyBookmark.svg';
import FulledBookmark from '../assets/fulledBookmark.svg';

const TextContainer = ({ memo, navigation, destination, history }) => {
  const token = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //useEffect(() => {}, [memo]);

  const handleBookmark = async (memo) => {
    const formData = {
      memo_id: memo.id,
      is_marked: memo.is_marked,
    };
    try {
      const postBookmarkRes = await PostBookmark(token, formData);
      console.log('postBookmarkRes 성공: ', postBookmarkRes.data);
      dispatch(bookmarkMemo(memo.id));
    } catch (error) {
      console.log(`postBookmarkRes 실패: ${error}`);
    }
  };

  const handlePress = (memo) => {
    navigation.navigate(`${destination}`, {
      id: memo.id,
      memo_text: memo.memo_text,
      tag_id: memo.tag_id,
      tag_name: memo.tag_name,
      tag_color: memo.tag_color,
      is_marked: memo.is_marked,
      url: memo.url,
      history: history,
    });
  };

  const handleDelete = async (memoID) => {
    setLoading(true);
    try {
      console.log(memoID);
      const delMemoRes = await DeleteMemo(token, memoID);
      console.log(`메모 삭제 성공: ${JSON.stringify(delMemoRes.data)}`);
      dispatch(delMemo(memoID));
    } catch (error) {
      console.log(`메모 삭제 실패: ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}
      <TouchableHighlight
        onPress={() => {
          handlePress(memo);
        }}
        onLongPress={() => {
          Alert.alert('삭제 확인', '정말 삭제할까요?', [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '삭제',
              onPress: () => {
                handleDelete(memo.id);
              },
            },
          ]);
        }}
      >
        <BoxContainer>
          {memo.url ? (
            <>
              {/* TODO onLoad 로직 추가 */}
              <RNUrlPreview text={`${memo.memo_text}, ${memo.url}`} />
              <TextR>
                <TextSize color={palette.gray2}>{memo.url}</TextSize>
              </TextR>
              <TextR>{memo.memo_text}</TextR>
            </>
          ) : (
            <TextR>{memo.memo_text}</TextR>
          )}
          {/* TODO 변수명 수정, bookmark api 로직 */}
          <BookmarkBox2>
            {memo.tag_name ? (
              <TagBox backgroundColor={memo.tag_color}>
                <TextB>
                  <TextItem>{memo.tag_name}</TextItem>
                </TextB>
              </TagBox>
            ) : (
              <View />
            )}

            <BookmarkButton
              onPress={() => {
                handleBookmark(memo);
              }}
            >
              {memo.is_marked ? <FulledBookmark /> : <EmptyBookmark />}
            </BookmarkButton>
          </BookmarkBox2>
        </BoxContainer>
      </TouchableHighlight>
    </>
  );
};

export default TextContainer;

const BookmarkButton = styled.TouchableOpacity``;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SpinnerWrapper = styled.View`
  position: absolute;
  left: ${SCREEN_WIDTH * 0.5 - 18}px;
  bottom: ${SCREEN_HEIGHT * 0.1 + 18}px;
  z-index: 10;
`;
