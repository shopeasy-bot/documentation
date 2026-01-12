import { getPostDate } from "@/components/blog/date";
import BlogPostsPage from "@/components/blog/page";
import { blog } from "@/lib/sourcer";

export default function Page() {
    const posts = [...blog.getPages()]
        .sort((a, b) =>
            getPostDate(b).getTime() -
            getPostDate(a).getTime()
        );
    return <BlogPostsPage posts={posts} />
}