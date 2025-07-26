export const Card = ({ children, classNames }: { children: React.ReactNode, classNames?: string }) => {
  return (
    <div className={"not-dark:bg-white dark:bg-slate-700 p-4 rounded shadow" + classNames}>
      {children}
    </div>
  );
};