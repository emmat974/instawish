import Posts from "@/components/Post/Posts";
import IsFollewing from "@/components/Profil/IsFollowing";
import Profil from "@/components/Profil/Profil";
import { getUserFollowers, getPostsUser, getUserFollowings } from "@/libs/api";

export default async function UserProfil({ params }) {

    const posts = await getPostsUser(params.id);
    const followers = await getUserFollowers(params.id);
    const followings = await getUserFollowings(params.id);

    console.log(followers);

    return <>
        <Profil user={posts[0].createdBy} followers={followers.followers.length} followings={followings.followings.length} posts={posts.length} />
        <IsFollewing userMeId={57} followers={followers.followers} userProfileId={params.id} />
        <Posts posts={posts} />
    </>
}
