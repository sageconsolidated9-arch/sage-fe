export interface SchemaPreview {
  id: string;
  RawField: string;
  Value: string;

  MappedTo?: string;
}

export const mockSchemaPreview: SchemaPreview[] = [
  {
    id: "1",
    RawField: "usr",
    Value: "jdoe",
    MappedTo: "user.username",
  },
  {
    id: "2",
    RawField: "src_ip",
    Value: "185.92.11.3",
    MappedTo: "network.client.ip",
  },
  {
    id: "3",
    RawField: "ts",
    Value: "2025-09-23T09:42Z",
    MappedTo: "event.timestamp",
  },
];
