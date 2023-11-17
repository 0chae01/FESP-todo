import { todoSearchAtom } from '@/recoil/atom';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import useDebounce from '@/hooks/useDebounce';
import { DELAY_TIME } from '@/constants/debounce';
import { styled } from 'styled-components';

interface SearchInputProps {
  isSearchMode: boolean;
}
const SearchInput = ({ isSearchMode }: SearchInputProps) => {
  const setSearchValue = useSetRecoilState(todoSearchAtom);
  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce<string>({ value: inputValue, delay: DELAY_TIME });

  useEffect(() => {
    setInputValue('');
  }, [isSearchMode]);

  useEffect(() => {
    const regex = /\s/g;
    isSearchMode && setSearchValue(debouncedValue.replace(regex, ''));
  }, [debouncedValue]);

  return (
    <StyledSearchInput
      placeholder="검색어를 입력하세요."
      value={inputValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
    />
  );
};

export default SearchInput;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 18px;
  padding: 4px 10px;
  margin: 4px 0;
  border-radius: 10px;
  border: 2px solid #015ecc;
`;
