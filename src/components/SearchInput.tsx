import useDebounce from '@/hooks/useDebounce';
import { todoSearchAtom } from '@/recoil/atom';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

interface SearchInputProps {
  isSearchMode: boolean;
}
const SearchInput = ({ isSearchMode }: SearchInputProps) => {
  const setSearchValue = useSetRecoilState(todoSearchAtom);
  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce<string>({ value: inputValue, delay: 500 });

  useEffect(() => {
    setInputValue('');
  }, [isSearchMode]);

  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
    const regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    isSearchMode && setSearchValue(debouncedValue.trim().replace(regexr, ''));
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
