export const ErrorMessage = ({ message }: { message?: string }) => {
  return (message && <span className="text-red-600">{message}</span>);
};
