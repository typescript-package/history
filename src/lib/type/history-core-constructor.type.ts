import { Data, DataCore } from "@typescript-package/data";
// Abstract.
import { HistoryCore } from "../core";

export type HistoryCoreConstructor<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> = new (size?: Size, data?: new (value: Value[]) => DataType) => HistoryCore<Value, Size, DataType>;
