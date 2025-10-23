import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { CategoriesAPI } from "@/lib/api";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ 
    name: "", 
    description: "", 
    color: "#6366f1" 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await CategoriesAPI.list();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    try {
      setLoading(true);
      await CategoriesAPI.create(newCategory);
      setNewCategory({ name: "", description: "", color: "#6366f1" });
      await loadCategories();
    } catch (error) {
      console.error("Failed to create category:", error);
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await CategoriesAPI.remove(id);
      await loadCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Create New Category</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <Input
                placeholder="Category name"
                value={newCategory.name}
                onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input
                placeholder="Category description"
                value={newCategory.description}
                onChange={e => setNewCategory({...newCategory, description: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={e => setNewCategory({...newCategory, color: e.target.value})}
                  className="h-10 w-20"
                />
                <Input
                  placeholder="#6366f1"
                  value={newCategory.color}
                  onChange={e => setNewCategory({...newCategory, color: e.target.value})}
                />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Category"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-3">Existing Categories</h3>
        <div className="grid gap-3">
          {categories.map(cat => (
            <Card key={cat._id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div>
                    <h4 className="font-medium">{cat.name}</h4>
                    {cat.description && (
                      <p className="text-sm text-slate-600">{cat.description}</p>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
          {categories.length === 0 && (
            <p className="text-slate-600 text-center py-4">No categories yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
