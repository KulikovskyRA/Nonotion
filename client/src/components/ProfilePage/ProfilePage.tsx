import React from 'react';

import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();
  console.log(id);
  return <div>ProfilePage</div>;
};

export default ProfilePage;
