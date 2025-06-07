import { CreateAccountForm } from "./CreateAccountForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an Account",
}
const CreateAccountPage = () => {
  return (
    <CreateAccountForm />
  );
};
export default CreateAccountPage;