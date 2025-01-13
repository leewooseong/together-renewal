import axios from 'axios';

const verifyToken = async (token: {name: string; value: string} | undefined): Promise<boolean> => {
  try {
    await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/user`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );
    return true;
  } catch {
    return false;
  }
};

export default verifyToken;
