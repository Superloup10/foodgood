export default function CategoryPage({params}: {params: {category: string}}) {
  return (
    <p>{params.category}
    </p>
  );
}