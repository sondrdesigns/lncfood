import { redirect } from "next/navigation";

export default function CreditApplicationRedirect() {
  // Credit application is now integrated into the Partner Application form.
  redirect("/partner-application");
}
