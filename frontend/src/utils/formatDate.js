export default function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}
