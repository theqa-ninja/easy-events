export const ColoredBackground = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor: string;
}) => {
  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center ${bgColor}`}
    >
      {children}
    </div>
  );
};
