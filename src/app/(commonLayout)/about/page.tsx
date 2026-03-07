// export const dynamic = "force-dynamic";
"use client";
import { blogService } from "@/app/services/blog.service";
import { useEffect, useState } from "react"


export default function AboutPage() {
  const [data, setData] = useState();

  console.log(data);

  useEffect(() => {
    (async () => {
      const { data } = await blogService.getBlogPosts();
      setData(data);
    })();
  }, []);

  // Simulate a delay
  // await new Promise((resolve)=> setTimeout(resolve, 4000))

  // Simulate an error
  // throw new Error('Failed to load AboutPage');

  return (
    <div>AboutPage</div>
  )
}
