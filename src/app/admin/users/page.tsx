import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const users = [
  { name: "Avery Stone", email: "avery@example.com", status: "ACTIVE", plan: "Yearly", scores: "38, 33, 41, 29, 36" },
  { name: "Mina Patel", email: "mina@example.com", status: "PAST_DUE", plan: "Monthly", scores: "24, 31, 35, 30, 28" },
  { name: "Jon Bell", email: "jon@example.com", status: "LAPSED", plan: "Monthly", scores: "18, 21, 34, 40, 22" }
];

export default function AdminUsersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-semibold md:text-5xl">User management</h1>
      <Card className="mt-8 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="border-b border-line bg-ink/5">
              <tr>
                {["User", "Subscription", "Plan", "Scores", "Actions"].map((heading) => (
                  <th key={heading} className="px-5 py-4 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {users.map((user) => (
                <tr key={user.email}>
                  <td className="px-5 py-4">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-ink/55">{user.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={user.status === "ACTIVE" ? "success" : "warn"}>{user.status}</Badge>
                  </td>
                  <td className="px-5 py-4">{user.plan}</td>
                  <td className="px-5 py-4">{user.scores}</td>
                  <td className="px-5 py-4">
                    <Button variant="secondary">Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
