import { generateMeta } from "@/lib/utils";

import { LoginForm } from "@/features/auth";

export function generateMetadata() {
  return generateMeta({
    title: "Login Page",
    description:
      "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
    canonical: "/login/v1",
  });
}

export default function Page() {
  return (
    <div className="flex pb-8 lg:h-screen lg:pb-0">
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <img
          width="1000px"
          height="1000px"
          src={`/images/extra/image4.jpg`}
          alt="shadcn/ui login page"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full items-center justify-center lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
