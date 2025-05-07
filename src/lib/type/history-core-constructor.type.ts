import { DataCore, DataConstructorInput } from '@typescript-package/data';
// Abstract.
import { HistoryCore } from "../core";

export type HistoryCoreConstructor<
  Value,
  Size extends number,
  DataType extends DataCore<readonly Value[]>,
  HistoryType extends HistoryCore<Value, Size, DataType> 
> = new (
  size?: Size,
  initialValue?: readonly Value[],
  data?: DataConstructorInput<readonly Value[], DataType>
) => HistoryType;
