import { useContext } from 'react';
import { SupabaseContext } from '../context/SupabaseContext';

const TestingPage = () => {
  const { supabaseProfile } = useContext(SupabaseContext);

  return (
    <>
      <h1>Testing Page</h1>
      <hr />
      <p>{supabaseProfile.email}</p>
      {supabaseProfile.location_preference.map((location, index) => (
        <p key={index} style={{ padding: '30px' }}>
          {location}
        </p>
      ))}
    </>
  );
};

export default TestingPage;
