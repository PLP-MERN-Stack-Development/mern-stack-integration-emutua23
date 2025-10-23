import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { PostsAPI } from "../lib/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { formatDate } from "../lib/utils";
import { Eye, Heart, MessageCircle, ArrowLeft } from "lucide-react";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPost();
  }, [id]);

  async function loadPost() {
    try {
      setLoading(true);
      const data = await PostsAPI.getById(id);
      setPost(data);
    } catch (error) {
      console.error("Failed to load post:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    try {
      setSubmitting(true);
      const updated = await PostsAPI.addComment(id, {
        userId: user.id,
        userName: user.firstName || user.username || "Anonymous",
        content: comment
      });
      setPost(updated);
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteComment(commentId) {
    if (!confirm("Delete this comment?")) return;

    try {
      const updated = await PostsAPI.deleteComment(id, commentId);
      setPost(updated);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment");
    }
  }

  async function handleLike() {
    try {
      const updated = await PostsAPI.like(id);
      setPost(updated);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading post...</div>;
  }

  if (!post) {
    return <div className="text-center py-8">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Card>
        <CardHeader className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span>By {post.userName}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map(cat => (
                <Badge
                  key={cat._id}
                  style={{ backgroundColor: cat.color }}
                  className="text-white"
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-slate-600 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{post.views || 0} views</span>
            </div>
            <button
              onClick={handleLike}
              className="flex items-center gap-2 hover:text-red-600 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>{post.likes || 0} likes</span>
            </button>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments?.length || 0} comments</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-slate-800 leading-relaxed">
              {post.content}
            </p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">
            Comments ({post.comments?.length || 0})
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <form onSubmit={handleAddComment} className="space-y-3">
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
              />
              <Button type="submit" disabled={submitting}>
                {submitting ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          )}

          <div className="space-y-3">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map(c => (
                <div key={c._id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{c.userName}</p>
                      <p className="text-xs text-slate-600">
                        {formatDate(c.createdAt)}
                      </p>
                    </div>
                    {user?.id === c.userId && (
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeleteComment(c._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                  <p className="text-slate-700">{c.content}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
