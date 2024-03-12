// import classNames from 'classnames';


export interface TableItem {
  _id: string;
}

export interface Header<T extends TableItem> {
  title: string | JSX.Element;
  key: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => JSX.Element | string | null;
}

export interface TableProps<T extends TableItem> {
  headers: Header<T>[];
  data: T[];
  emptyComponent?: JSX.Element | string;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
}

const Table = <T extends TableItem>({
  headers,
  data,
  emptyComponent = 'No data to display',
  onRowClick,
  className,
}: TableProps<T>) => {
  if (data?.length === 0) return <div>{emptyComponent}</div>;
  return (
    <div className='flex flex-col w-full '>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
          <div className=" overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl ">
              <thead className="bg-gray-50 h-16">
                <tr className="bg-white">
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      scope="col"
                      className="px-6 py-3 text-left text-base font-font font-semibold text-darkBlue tracking-wider bg-white"
                    >
                      {header.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.map((row, i) => (
                  <tr
                    className="hover:bg-gray-100 ease-in-out duration-200"
                    onClick={() => {
                      if (onRowClick) onRowClick(row, i);
                    }}
                    key={row._id}
                  >
                    {headers.map((header) => {
                      let value: any = header.dataIndex ? row[header.dataIndex] : null;
                      if (header.render) {
                        value = header.render(value, row, i);
                      }
                      return (
                        <td key={header.key} className="px-6 py-4 whitespace-nowrap font-font">
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
