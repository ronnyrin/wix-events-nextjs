export function formatDate(date: Date): string {
  console.log(date);
  return Intl.DateTimeFormat('en-ie', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
