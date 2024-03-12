/* eslint-disable react/require-default-props */

import { useNavigate } from 'react-router-dom';
import useTableControls from '../../hooks/useTableControls';
import Table, { TableItem, TableProps } from './table';
import Pagination, { PaginationProps } from './pagination';
import { useStack } from '../../contexts/Stack';
import DeleteModel from './DeleteModel';
import UpdateModel from './UpdateModal';

interface ListProps<T extends TableItem> extends TableProps<T>, PaginationProps {
  canDelete?: boolean;
  canUpdate?: boolean;
  canCreate?: boolean;
  loading?: boolean;
  onRowClick?: (row: T, index: number) => void;
}

const List = <T extends TableItem>({
  data,
  headers: headersProp,
  totalPages,
  currentPage,
  onPageChange,
  onRowClick,
  canDelete,
  canUpdate,
  loading,
}: ListProps<T>) => {
  const router = useNavigate();
  const stack = useStack();
  const headers = useTableControls(headersProp, data, {
    onEdit: canUpdate ? ({ _id }: any) => stack.push(<UpdateModel HideModal={() => stack.pop()} userId={_id} />) : undefined,
    onDelete: canDelete ? ({ _id, firstName }: any) => stack.push(<DeleteModel HideModal={() => stack.pop()} id={_id} firstName={firstName} />) : undefined,
    onMultipleDelete: canDelete ? (ids: any) => router(`delete/${ids.join(',')}`) : undefined,

  });
  return (
    <div className="px-20 py-10 flex-1 flex flex-col items-center">
      <Table onRowClick={onRowClick} className="flex-1" data={data} headers={headers} />

      {!loading && totalPages !== 0 && (
        <Pagination className="pt-4" totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
      )}
    </div>
  );
};

export default List;
