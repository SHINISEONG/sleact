import { useParams } from 'react-router';
import { Container, Header } from './styles';

const Channel = () => {
  const { channel } = useParams();

  return (
    <Container>
      <Header>
        <div>채널!</div>
      </Header>
    </Container>
  );
};

export default Channel;
