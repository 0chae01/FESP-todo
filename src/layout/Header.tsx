import SearchIcon from '@/assets/SearchIcon';
import SearchInput from '@/components/SearchInput';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const location = useLocation();
  const [pathName, setPathName] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    switch (location.pathname.split('/')[1]) {
      case '':
        setPathName('');
        return;
      case 'info':
        setPathName('상세정보');
        return;
      case 'update':
        setPathName('수정하기');
        return;
      case 'regist':
        setPathName('등록하기');
        return;
    }
  }, [location]);

  return (
    <>
      <HeaderContainer>
        <Link to={'/'}>TODO</Link>
        {pathName ? (
          <h2>{pathName}</h2>
        ) : (
          <SearchIconContainer
            onClick={() => setIsSearchMode((prev) => !prev)}
            className={isSearchMode.toString()}
          >
            <SearchIcon size={28} />
          </SearchIconContainer>
        )}
      </HeaderContainer>
      {!pathName && isSearchMode && <SearchInput isSearchMode={isSearchMode} />}
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & a {
    color: black;
    font-weight: 900;
    font-size: 50px;
    cursor: pointer;

    &:visited {
      color: black;
    }
  }

  & h2 {
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    padding: 0 10px;
  }
`;

const SearchIconContainer = styled.button`
  color: ${(props) => (props.className === 'true' ? '#fff' : 'gray')};
  background-color: ${(props) => (props.className === 'true' ? '#015ecc' : '#ececec')};
  padding: 8px 10px;
  border: none;
  border-radius: 100%;
  cursor: pointer;
`;
