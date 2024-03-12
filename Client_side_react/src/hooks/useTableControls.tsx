import { useEffect, useState } from 'react';
import { Header } from '../features/AccManagment/table';

const checkboxClassName = 'h-5 w-5';

function useTableControls<T extends { id: string }>(
  headers: Header<T>[],
  data: T[],
  {
    onEdit,
    onDelete,
    onMultipleDelete,
  }: {
    onEdit?: (row: T, index: number) => void;
    onDelete?: (row: T, index: number) => void;
    onMultipleDelete?: (values: string[]) => void;
  } = {},
) {
  const [values, valuesChange] = useState<{ id: string; checked: boolean }[]>([]);

  useEffect(() => {
    valuesChange((prevValues) =>
      data.map(
        ({ id }) =>
          prevValues.find((value) => value.id === id) || {
            id,
            checked: false,
          },
      ),
    );
  }, [data]);

  function checkAll(e: React.ChangeEvent<HTMLInputElement>) {
    valuesChange(values.map(({ id }) => ({ id, checked: e.target.checked })));
  }

  function onRowCheck(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const table = [...values];
    table[i] = { ...table[i], checked: e.target.checked };
    valuesChange(table);
  }

  return [
    onMultipleDelete && {
      title: values.length ? (
        <input
          type="checkbox"
          className={checkboxClassName}
          onChange={checkAll}
          checked={values.every((value) => value.checked)}
        />
      ) : (
        ''
      ),
      key: '__check__',
      render(value: any, row: T, i: number) {
        return (
          <input
            className={checkboxClassName}
            type="checkbox"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRowCheck(event, i)}
            checked={values[i] ? values[i].checked : false}
          />
        );
      },
    },
    ...headers,
    (onMultipleDelete || onEdit || onDelete) && {
      title:
        onMultipleDelete && values.some((v) => v.checked) ? (
          <button
            onClick={() => onMultipleDelete(values.filter((item) => item.checked).map((item) => item.id))}
            className="bg-lightBlue hover:bg-lime-200 text-darkBlue  font-bold py-2 px-4 h-10 rounded focus:outline-none focus:shadow-outline"
          >
            Delete all
          </button>
        ) : (
          ''
        ),
      key: '__controls__',
      render: (_value: any, row: T, index: number) => {
        return (
          <div className="flex gap-3">
            {onEdit && (
              <button
                onClick={() => onEdit(row, index)}
                className="bg-[#FFCC29] opacity-[50%] hover:bg-orange-200 text-darkBlue h-10 font-font py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(row, index)}
                className="hover:bg-yellow bg-[#FEB421] text-white h-10 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            )}
          </div>
        );
      },
    },
  ].filter(Boolean) as Header<T>[];
}

export default useTableControls;
