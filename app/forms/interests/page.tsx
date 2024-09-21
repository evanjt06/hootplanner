import { Separator } from "@/components/ui/separator"
import { DisplayForm } from "./interest-form"

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Career and Major Interests</h3>
        <p className="text-sm text-muted-foreground">
          Let's identify areas around your major that you want to explore.
        </p>
      </div>
      {/* <Separator /> */}
      <DisplayForm />
    </div>
  )
}
