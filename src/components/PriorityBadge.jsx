export default function PriorityBadge({ level = 'MED' }) {
  const styles = {
    LOW: "bg-green-200 text-green-700",
    MED: "bg-yellow-200 text-yellow-700",
    HIGH: "bg-red-200 text-red-700",
  };

  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${styles[level] ?? styles.MED}`}>
      {level}
    </span>
  );
}