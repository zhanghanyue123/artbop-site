import { redirect } from "next/navigation";
import { requireEditor } from "@/lib/editor-auth";
import EditorWorkspace from "./workspace";

export default async function EditorPage() {
  const user = await requireEditor();

  if (!user) {
    redirect("/editor/login");
  }

  return <EditorWorkspace email={user.email || ""} />;
}
