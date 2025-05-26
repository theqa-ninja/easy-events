export const ErrorMessage = ({ message }: { message?: string }) => {
  return (message && <p className="text-red-500">{message}</p>);
};
