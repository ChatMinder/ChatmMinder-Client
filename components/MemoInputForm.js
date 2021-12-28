import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { addCategory, addMemo, setMemoInCategory } from '../shared/reducer.js';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';

const MemoInputForm = () => {
  const dispatch = useDispatch();
  const memoObj = useSelector((state) => state);

  const [isShpBtnToggled, setIsShpBtnToggled] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: '',
      memo: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(addCategory(data.category));
    dispatch(addMemo(data.category, data.memo));
    dispatch(setMemoInCategory(data.category));
  };

  return (
    <Wrapper>
      {isShpBtnToggled && (
        <ShpItemContainer horizontal={true}>
          {memoObj[0].map((category) => (
            <EachCategoryBtn key={category.categoryID}>
              <Text>{category.categoryName}</Text>
            </EachCategoryBtn>
          ))}
          {/* <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputCategory
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="카테고리"
              />
            )}
            name="category"
            // rules={{ required: true }}
          /> */}
        </ShpItemContainer>
      )}
      <MemoInputContainer>
        <ShpBtn onPress={() => setIsShpBtnToggled(!isShpBtnToggled)} />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputMemo
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="메모"
            />
          )}
          name="memo"
          rules={{ required: true }}
        />
        {/* {errors.memo && <Text>This is required.</Text>} */}
        <View>
          <Submit title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </MemoInputContainer>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  background: #f6f6f7;
`;

const ShpItemContainer = styled.ScrollView`
  flex-direction: row;
  border: 1px solid black;
`;
const EachCategoryBtn = styled.TouchableOpacity`
  background: orange;
  margin: 0 10px;
`;
const InputCategory = styled.TextInput`
  border: 1px solid red;
`;

const MemoInputContainer = styled.View`
  flex-direction: row;
`;
const ShpBtn = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  background: purple;
`;
const InputMemo = styled.TextInput`
  border: 1px solid green;
  width: 80%;
`;
const Submit = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  background: brown;
`;

export default MemoInputForm;