import Posts from "@/components/Post/Posts";
import IsFollewing from "@/components/Profil/IsFollowing";
import Profil from "@/components/Profil/Profil";
import { getUserFollowers, getPostsUser, getUserFollowings, getMe } from "@/libs/api";

export default async function UserProfil({ params }) {

    const me = await getMe();

    const posts = await getPostsUser(params.id);
    const followers = await getUserFollowers(params.id);
    const followings = await getUserFollowings(params.id);

    return <>
        <Profil user={posts[0].createdBy} followers={followers} followings={followings} posts={posts.length} />
        <IsFollewing me={me} followers={followers} userProfileId={params.id} />
        <hr />
        <Posts me={me} posts={posts} />
    </>
}
