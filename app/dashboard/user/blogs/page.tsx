"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import api from "@/lib/api";
import { LoaderCircleIcon } from 'lucide-react';

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isPremium: z.boolean().default(false),
});

type BlogFormData = z.infer<typeof blogSchema>;

const BlogManagementPage: React.FC = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/blogPosts`);
      setBlogs(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const onSubmit = async (data: BlogFormData) => {
    try {
      const payload = {
        ...data,
        authorId: session?.user?.id,
      };

      const response = await api.post(`/api/blogPosts`, payload);

      if (response?.data?.success) {
        toast.success("Blog post created successfully!");
        fetchBlogs();
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    reset(blog);
  };

  const handleUpdate = async (data: BlogFormData) => {
    try {
      const payload = {
        ...data,
      };

      const response = await api.patch(`/api/blogPosts/${editingBlog?.id}`, payload);

      if (response?.data?.success) {
        toast.success("Blog post updated successfully!");
        fetchBlogs();
        setEditingBlog(null);
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleDelete = async (blogId: number) => {
    try {
      const response = await api.delete(`/api/blogPosts/${blogId}`);

      if (response?.data?.success) {
        toast.success("Blog post deleted successfully!");
        fetchBlogs();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Blog Management</h2>
      <Card>
        <form onSubmit={handleSubmit(editingBlog ? handleUpdate : onSubmit)}>
          <CardHeader>
            <CardTitle>{editingBlog ? "Edit Blog Post" : "Create Blog Post"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input {...register("title")} placeholder="Enter blog title" />
              {errors?.title && (
                <p className="text-red-500 text-sm">{errors?.title?.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea {...register("content")} placeholder="Enter blog content" />
              {errors?.content && (
                <p className="text-red-500 text-sm">{errors?.content?.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="isPremium">Premium</Label>
              <Checkbox {...register("isPremium")} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  {editingBlog ? "Updating..." : "Creating..."}
                </>
              ) : (
                editingBlog ? "Update Blog Post" : "Create Blog Post"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-8 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogs?.map((blog: any) => (
            <Card key={blog?.id} className="space-y-4">
              <CardHeader>
                <CardTitle>{blog?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{blog?.content}</p>
                <p className="text-sm text-muted-foreground">{blog?.isPremium ? "Premium" : "Free"}</p>
              </CardContent>
              <CardFooter className="flex space-x-4">
                <Button variant="outline" onClick={() => handleEdit(blog)}>Edit</Button>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline" className="text-red-500">Delete</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <Button onClick={() => handleDelete(blog?.id)} className="w-full text-red-500">Confirm Delete</Button>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManagementPage;