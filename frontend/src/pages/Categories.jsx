import CategoryManager from "../components/CategoryManager";

export default function Categories() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Manage Categories</h2>
        <p className="text-slate-600">Create and organize blog categories</p>
      </div>

      <CategoryManager />
    </div>
  );
}
