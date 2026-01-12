import { BlogPost } from "@/lib/sourcer";
import { basename, extname } from "node:path";

export function getPostDate(post: BlogPost){
    return new Date(post.data.date 
        ?? basename(post.path, extname(post.path))
    );
}