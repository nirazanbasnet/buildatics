import { getProfile, ProfileView } from "@/features/profile";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Profile",
    description: "View and update your account details.",
    canonical: "/profile"
  });
}

export default async function ProfilePage() {
  const profile = await getProfile();

  return <ProfileView profile={profile} />;
}
