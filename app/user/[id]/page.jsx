import Posts from "@/components/Post/Posts";
import IsFollewing from "@/components/Profil/IsFollowing";
import { getUserFollowers, getPostsUser } from "@/libs/api";

export default async function UserProfil({ params }) {

    const posts = await getPostsUser(params.id);

    return <>
        <IsFollewing userMeId={57} userProfileId={params.id} />
        <Posts posts={posts} />
    </>
}
