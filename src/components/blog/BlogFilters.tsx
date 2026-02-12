interface BlogFiltersProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const BlogFilters = ({ categories, activeCategory, onCategoryChange }: BlogFiltersProps) => {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          activeCategory === null
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
