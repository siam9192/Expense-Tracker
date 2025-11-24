import { Languages } from "lucide-react";
import { useLocalSettingsProviderContext } from "../../Provider/LocalSettingsProvider";
import type { AppLanguage } from "../../types/settings.type";

function LanguageSwitcher() {
  const { settings, setSettings } = useLocalSettingsProviderContext();
  const handelChange = (value: string) => {
    setSettings((p) => ({ ...p, language: value as AppLanguage }));
  };
  return (
    <div className="flex items-center gap-3">
      <Languages className="text-primary" size={24} />
      <select
        onChange={(e) => handelChange(e.target.value)}
        className="select select-sm select-bordered border-primary font-secondary"
        defaultValue={settings.language}
      >
        <option disabled>Choose Language</option>
        <option value={"en"}>English</option>
        <option value={"bn"}>Bangla</option>
        <option value={"es"}>Spanish</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
