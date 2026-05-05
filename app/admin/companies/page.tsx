import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminCompaniesClient from "./AdminCompaniesClient";
import AdminApplicantsClient from "./AdminApplicantsClient";

export default async function Page() {
  const user = await currentUser();

  // Not logged in → redirect to homepage / sign-in
  if (!user) {
    redirect("https://Tauzand.in");
  }

  // Extract primary email
  const email = user.emailAddresses?.[0]?.emailAddress;

  // Fail-safe: no email found
  if (!email) {
    redirect("/");
  }

  // Load admin emails from ENV
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

  // Check admin access
  const isAdmin = adminEmails.includes(email.toLowerCase());

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div >
      <AdminCompaniesClient />
      <AdminApplicantsClient />
    </div>
  );
}
