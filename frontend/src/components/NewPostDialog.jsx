import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { CategoriesAPI } from "@/lib/api";

export default function NewPostDialog({ onCreate, categories: propCategories }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(propCategories || []);
  const [form, setForm] = useState({ 
    title: "", 
    content: "",
    excerpt: "",
    categories: [],
    tags: "",
    status: "published"
  });

  useEffect(() => {
    if (open && !propCategories) {
      CategoriesAPI.list().then(setCategories).catch(console.error);
    }
  }, [open, propCategories]);

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    
    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean)
    };
    
    onCreate(payload).then(() => { 
      setForm({ 
        title: "", 
        content: "", 
        excerpt: "",
        categories: [],
        tags: "",
        status: "published"
      }); 
      setOpen(false); 
    });
  }

  function toggleCategory(catId) {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(catId)
        ? prev.categories.filter(id => id !== catId)
        : [...prev.categories, catId]
    }));
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>New Post</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-xl font-semibold mb-4">Create New Post</Dialog.Title>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input 
                placeholder="Enter post title" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content *</label>
              <Textarea 
                rows={8} 
                placeholder="Write your post content..." 
                value={form.content} 
                onChange={e => setForm({...form, content: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Excerpt (Optional)</label>
              <Textarea 
                rows={2} 
                placeholder="Brief summary of your post" 
                value={form.excerpt} 
                onChange={e => setForm({...form, excerpt: e.target.value})}
              />
            </div>

            {categories.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => toggleCategory(cat._id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        form.categories.includes(cat._id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
              <Input 
                placeholder="tech, programming, tutorial" 
                value={form.tags} 
                onChange={e => setForm({...form, tags: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select 
                className="w-full border rounded-md px-3 py-2"
                value={form.status}
                onChange={e => setForm({...form, status: e.target.value})}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit">Create Post</Button>
              <Button 
                type="button" 
                className="bg-slate-600 hover:bg-slate-700" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
