import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatRelativeTime, truncateText } from "@/lib/utils";
import { Eye, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, onDelete, showActions = false, currentUserId }) {
  const navigate = useNavigate();
  const isAuthor = currentUserId === post.userId;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 
              className="text-xl font-semibold hover:text-blue-600 cursor-pointer"
              onClick={() => navigate(`/post/${post._id}`)}
            >
              {post.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              By {post.userName} • {formatRelativeTime(post.createdAt)}
            </p>
          </div>
          {showActions && isAuthor && (
            <div className="flex gap-2">
              <Button 
                size="sm"
                className="bg-slate-700 hover:bg-slate-800"
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                Edit
              </Button>
              <Button 
                size="sm"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => onDelete(post._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((cat) => (
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
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-slate-700 line-clamp-3">
          {truncateText(post.content, 200)}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-slate-600 pt-2 border-t">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{post.views || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{post.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={() => navigate(`/post/${post._id}`)}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}
