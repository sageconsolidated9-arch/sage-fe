export interface FieldDictionary {
  id: string;
  Field: string;
  Category: string;
  Type: string;
  Description: string;
  UsedBy: string;
  Actions?: string;
}

export const mockFieldDictionary: FieldDictionary[] = [
  {
    id: "1",
    Field: "src_ip",
    Category: "Network",
    Type: "String",
    Description: "IP where event originated",
    UsedBy: "42 rules",
    Actions: "View",
  },
  {
    id: "2",
    Field: "user.email",
    Category: "Identity",
    Type: "String",
    Description: "Normalized user email",
    UsedBy: "18 rules",
    Actions: "View",
  },
  {
    id: "3",
    Field: "process.name",
    Category: "Endpoint",
    Type: "String",
    Description: "Name of executed process",
    UsedBy: "31 rules",
    Actions: "View",
  },
];
