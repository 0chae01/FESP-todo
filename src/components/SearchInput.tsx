import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface SearchInputProps {
  isSearchMode: boolean;
}
const SearchInput = ({ isSearchMode }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue('');
  }, [isSearchMode]);

  return (
    <StyledSearchInput
      placeholder="검색어를 입력하세요."
      value={searchValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
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
