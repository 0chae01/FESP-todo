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
  border: none;
  padding: 4px;
  margin-left: 8px;
  cursor: pointer;
`;
