export interface TimeZoneOption {
  label: string;
  value: string;
}

export const getTimeZones = (): TimeZoneOption[] => {
  return Intl.supportedValuesOf("timeZone").map((tz) => {
    const date = new Date();
    const offset = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value;

    return {
      label: `${offset} — ${tz.split("/").pop()?.replace("_", " ")}`,
      value: tz,
    };
  });
};

export const industries = [
  { label: "Technology", value: "tech" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Manufacturing", value: "manufacturing" },
];

export const themes = [
  { label: "Auto", value: "auto" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export const languages = [
  { label: "Auto", value: "auto" },
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
];

export const dateFormats = [
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
  { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
];
