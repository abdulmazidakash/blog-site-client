"use server";

import { blogService } from "@/app/services/blog.service";


export const getBlogs = async () => {
  return await blogService.getBlogPosts();
};