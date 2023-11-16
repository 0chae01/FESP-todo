import { todoFilterAtom } from '@/recoil/atom';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

interface FilterButtonProps {
  value: TodoFilterType;
}

const FilterButton = ({ value }: FilterButtonProps) => {
  const [filter, setFilter] = useRecoilState(todoFilterAtom);

  return (
    <StyledFilterButton
      className={filter === value ? 'active' : ''}
      onClick={() => setFilter(value)}
    >
      {value}
    </StyledFilterButton>
  );
};

export default FilterButton;

const StyledFilterButton = styled.button`
  color: ${(props) => (props.className === 'active' ? '#015ECC' : 'black')};
  font-size: 20px;
  font-weight: 700;
  background: none;
  width: 100px;
  border: none;
  padding: 4px;
  margin: 0 10px;
  cursor: pointer;
`;
