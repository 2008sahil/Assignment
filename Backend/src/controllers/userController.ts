import { Request, Response } from "express";
import { User } from "../model/userModel";
import { fetchGitHubUser, fetchGitHubFollowers, checkUserFollows } from "../services/githubService";

// 1. Save GitHub user details to the database
export const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      const gitHubData = await fetchGitHubUser(username);
      user = await User.create({
        username: gitHubData.login,
        name: gitHubData.name,
        location: gitHubData.location,
        blog: gitHubData.blog,
        bio: gitHubData.bio,
        avatar_url: gitHubData.avatar_url,
        followers: gitHubData.followers,
        following: gitHubData.following,
        public_repos: gitHubData.public_repos,
        public_gists: gitHubData.public_gists,
        created_at: gitHubData.created_at,
        updated_at: gitHubData.updated_at,
        hireable: gitHubData.hireable,
        company: gitHubData.company,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const saveMutualFriends = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followers = await fetchGitHubFollowers(username);

    const mutualFriends: string[] = [];
    for (const follower of followers) {
      const isMutual = await checkUserFollows(username, follower.login);
      if (isMutual) {
        mutualFriends.push(follower.login);
      }
    }

    user.mutualFriends = mutualFriends;
    await user.save();

    res.status(200).json({ mutualFriends });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};