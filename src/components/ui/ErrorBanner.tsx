export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="text-center rounded-xl px-5 py-4 text-sm">
      {message}
    </div>
  );
}
