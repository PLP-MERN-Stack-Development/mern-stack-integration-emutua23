import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import PostCard from "../components/PostCard";
import { PostsAPI, CategoriesAPI } from "../lib/api";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";

export default function AllPosts() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    page: 1
  });
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [filters]);

  async function loadCategories() {
    try {
      const data = await CategoriesAPI.list();
      setCategories(data);
    } catch (e) {
      console.error("Failed to load categories:", e);
    }
  }

  async function loadPosts() {
    try {
      setStatus("loading");
      const params = {
        search: filters.search || undefined,
        category: filters.category || undefined,
        status: "published",
        page: filters.page,
        limit: 10
      };
      
      const data = await PostsAPI.list(params);
      setPosts(data.posts);
      setPagination(data.pagination);
      setStatus("success");
    } catch (e) {
      setError(e.message);
      setStatus("error");
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">All Posts</h2>
        <p className="text-slate-600">Explore all published blog posts</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <Input
            placeholder="Search posts..."
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>

        <select
          className="border rounded-md px-3 py-2"
          value={filters.category}
          onChange={e => setFilters({ ...filters, category: e.target.value, page: 1 })}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {status === "loading" && <p>Loading posts...</p>}
      {status === "error" && <p className="text-red-600">Error: {error}</p>}
      {status === "success" && posts.length === 0 && (
        <p className="text-center py-8 text-slate-600">
          No posts found. Try adjusting your filters.
        </p>
      )}

      <div className="grid gap-4">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            currentUserId={user?.id}
          />
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            disabled={pagination.page === 1}
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            disabled={pagination.page === pagination.pages}
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
