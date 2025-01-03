import axios from "axios";

export const fetchGitHubUser = async (username: string) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const fetchGitHubFollowers = async (username: string) => {
  const url = `https://api.github.com/users/${username}/followers`;
  const { data } = await axios.get(url);
  return data;
};

export const checkUserFollows = async (username: string, targetUser: string) => {
  const url = `https://api.github.com/users/${username}/following/${targetUser}`;
  try {
    const response = await axios.get(url);
    return response.status === 204;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    throw error;
  }
};