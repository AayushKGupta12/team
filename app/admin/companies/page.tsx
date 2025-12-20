import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminCompaniesClient from "./AdminCompaniesClient";

export default async function Page() {
  const user = await currentUser();

  // Not logged in → Clerk hosted sign-in
  if (!user) {
    redirect("https://accounts.clerk.dev/sign-in");
  }

  // Get primary email
  const email = user.emailAddresses[1]?.emailAddress;

  // Read admin emails from env
  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];

  const isAdmin = email && adminEmails.includes(email);


  if (!isAdmin) {
    redirect("/");
  }

  return <AdminCompaniesClient />;
}
