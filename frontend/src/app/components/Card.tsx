export const Card = ({ children, classNames }: { children: React.ReactNode, classNames?: string }) => {
  return (
    <div className={"not-dark:bg-white dark:bg-slate-800 p-4 rounded-md shadow-md " + classNames}>
      {children}
    </div>
  );
};