
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import Layout from "@/components/Layout";

const SignUp = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          <span className="text-custom-primary">Create</span> 
          <span className="text-custom-secondary"> Account</span>
        </h1>
        <ClerkSignUp signInUrl="/sign-in" routing="path" path="/sign-up" />
      </div>
    </Layout>
  );
};

export default SignUp;
