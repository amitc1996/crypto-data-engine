import { redirect } from "next/navigation";

export default function CreateJobPage() {
  redirect("/jobs?new=true");
}
