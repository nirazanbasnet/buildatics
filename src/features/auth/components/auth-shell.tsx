import type { ReactNode } from "react";

// Two-pane auth layout (brand image + centered form) shared by login and the account flows.
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex pb-8 lg:h-screen lg:pb-0">
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <img
          width="1000px"
          height="1000px"
          src="/images/extra/image4.jpg"
          alt="Buildatics"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
