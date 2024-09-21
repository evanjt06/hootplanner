import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./courses"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Course Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Let HootPlanner know your course preferences and prior academic coursework.
        </p>
      </div>
      {/* <Separator /> */}
      <AccountForm />
    </div>
  )
}
