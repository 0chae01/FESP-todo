import './App.css';
import Header from '@/layout/Header';
import { Outlet } from 'react-router-dom';
import Footer from '@/layout/Footer';
import { styled } from 'styled-components';

function App() {
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  width: 386px;
  height: 100%;
  margin: 0 auto;
`;
