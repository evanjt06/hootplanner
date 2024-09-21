import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Student Information</h3>
        <p className="text-sm text-muted-foreground">
          Let HootPlanner understand your current standing and academic level.
        </p>
      </div>
      <ProfileForm />
    </div>
  )
}
