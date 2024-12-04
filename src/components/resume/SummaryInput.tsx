export default function SummaryInput({
  summary,
  setSummary,
}: {
  summary: string;
  setSummary: any;
}) {
  return (
    <div className="summary">
      <h3 className="my-2">Summary</h3>
      <textarea
        className="my-1 block h-20 w-full"
        name="summary"
        placeholder="Your Profile summary"
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
      />
    </div>
  );
}
