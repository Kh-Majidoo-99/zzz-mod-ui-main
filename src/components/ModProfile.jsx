import { useParams } from 'react-router-dom';

const ModProfile = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Mod Profile Page</h2>
      <p>Mod ID: {id}</p>
      {/* You would fetch and display mod details here */}
    </div>
  );
};

export default ModProfile;
