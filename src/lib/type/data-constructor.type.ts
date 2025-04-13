import { DataCore } from "@typescript-package/data";

export type DataConstructor<
  Value,
  DataType extends DataCore<Value[]>
> = new (value: Value[]) => DataType;
