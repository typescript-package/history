import { DataCore, DataConstructorInput } from '@typescript-package/data';
// Class.
import { HistoryCurrent } from "../core";
/**
 * @description
 * @export
 * @template Value 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 */
export type HistoryCurrentConstructor<
  Value,
  DataType extends DataCore<readonly Value[]>,
  CurrentType extends HistoryCurrent<Value, DataType>
> = new (
  {value}: {value?: Value},
  data?: DataConstructorInput<readonly Value[], DataType>
) => CurrentType;
