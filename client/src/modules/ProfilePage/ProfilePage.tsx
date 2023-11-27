import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();

  console.log('---> ProfilePage - рендеринг', id);

  return <div>ProfilePage</div>;
};

export default ProfilePage;
