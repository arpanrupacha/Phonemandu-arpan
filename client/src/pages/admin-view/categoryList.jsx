import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, addCategory, deleteCategory } from "@/store/admin/category-slice";
import { Button } from "@/components/ui/button";

function AdminCategories() {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.adminCategories);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleAddCategory(e) {
    e.preventDefault();
    if (categoryName.trim()) {
      dispatch(addCategory(categoryName)).then(() => {
        setCategoryName("");
        dispatch(fetchCategories());
      });
    }
  }

  function handleDeleteCategory(id) {
    dispatch(deleteCategory(id)).then(() => dispatch(fetchCategories()));
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          placeholder="New Category Name"
          required
        />
        <Button type="submit">Add Category</Button>
      </form>
      <ul>
        {categoryList.map((cat) => (
          <li key={cat._id} className="flex items-center justify-between border-b py-2">
            <span>{cat.name}</span>
            <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(cat._id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCategories;