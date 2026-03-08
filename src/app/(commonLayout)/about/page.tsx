// export const dynamic = "force-dynamic";
"use client";
import { blogService } from "@/app/services/blog.service";
import { useEffect, useState } from "react"


export default function AboutPage() {
  const [data, setData] = useState();
  const [error, setError] = useState<{message: string} | null>(null);

  console.log(data);

  useEffect(() => {
    (async () => {
      const { data, error} = await blogService.getBlogPosts();
      setData(data);
      setError(error)
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
