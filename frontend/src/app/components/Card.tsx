export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="not-dark:bg-white dark:bg-slate-700 p-4 rounded shadow">
      {children}
    </div>
  );
};