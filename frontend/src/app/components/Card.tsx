export const Card = ({ children, classNames }: { children: React.ReactNode, classNames?: string }) => {
  return (
    <div className={"bg-background p-4 rounded-md shadow-md " + classNames}>
      {children}
    </div>
  );
};