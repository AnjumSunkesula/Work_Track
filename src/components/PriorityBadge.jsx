export default function PriorityBadge({ level }) {
  const styles = {
    LOW: "bg-green-100 text-green-700",
    MED: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
  };

  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${styles[level]}`}>
      {level}
    </span>
  );
}