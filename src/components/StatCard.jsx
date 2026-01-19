export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-brand-accent shadow-sm hover:shadow-md transition">
      <p className="text-sm text-brand-dark/70">{title}</p>
      <h2 className="text-3xl font-semibold mt-3 text-brand-primary">
        {value}
      </h2>
    </div>
  );
}