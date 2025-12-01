import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EventDeleteDialog({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Class Name</Label>
        <Input value={name} readOnly />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea rows={3} value={description} readOnly />
      </div>
    </div>
  );
}
