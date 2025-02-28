
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import Layout from "@/components/Layout";

const SignIn = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          <span className="text-custom-primary">Welcome</span> 
          <span className="text-custom-secondary"> Back</span>
        </h1>
        <ClerkSignIn signUpUrl="/sign-up" routing="path" path="/sign-in" />
      </div>
    </Layout>
  );
};

export default SignIn;
