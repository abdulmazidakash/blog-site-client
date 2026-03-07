
import { blogService } from "../services/blog.service";
import BlogCard from "@/components/modules/home/BlogCard";
import { BlogPost } from "../types/blog.type";

export default async function Home() {
  const { data } = await blogService.getBlogPosts({
    isFeatured: false,
    search: "",
  },{
    cache: "no-store"
  });
  
  console.log("blog posts:===>", data);
  
  return (
    <>
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-5 my-8">
      { data?.data?.map((post: BlogPost)=>(
        <BlogCard key={post.id} post={post}/>
      ))}
    </div>
    </>
  );
}
