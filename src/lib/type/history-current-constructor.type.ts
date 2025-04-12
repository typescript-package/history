import { Data, DataCore } from "@typescript-package/data";
// Class.
import { HistoryCurrent } from "../core";
/**
 * @description
 * @export
 * @template Value 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 */
export type HistoryCurrentConstructor<
  Value,
  DataType extends DataCore<Value[]> = Data<Value[]>
> = new ({value}: {value?: Value}, data?: new (value: Value[]) => DataType) => HistoryCurrent<Value, DataType>;
