import React from 'react';
import Nav from '../components/Navbar';
import '../App.css';


import { Container } from '@chakra-ui/react';

const SchedulePage = ({ onLogout }) => {

  return (
    <div>
      <Nav onLogout={onLogout} />
      <Container maxW="container.lg" p={4}>
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FStockholm&src=Y182Y2Y2OWZkOTcwNjQ0N2U2MmM1YTJiYjYxNDBlOTRiYTNlYWEyMGNjYzBhYmIzN2IzNWY5OTliMGI3MTJlOGEwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23F09300" 
      title="n0llancalendar" width="800" height="600" 
      frameborder="0" >
      </iframe>
      </Container>
    </div>
  );
};

export default SchedulePage;
