// TableData.tsx

import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, message } from 'antd';

// import LoadingPage from '@/components/LoadingPage';
// import { deleteBook, getAllBook } from '@/services/bookService';

interface Book {
  _id: string;
  booktitle: string;
  price: number;
  author: string;
  publisher: string;
  category: string;
  quantity: number;
}

const TableData: React.FC<Props> = ({

}) => {
  const [data, setData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns: React.TableProps<Book>['columns'] = [
    {
      title: 'Title',
      width: 20,
      dataIndex: 'booktitle',
      key: 'booktitle',
    },
    {
      title: 'Price',
      width: 10,
      dataIndex: 'price',
      key: 'price',
      sorter: (a: Book, b: Book) => a.price - b.price,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 15,
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher',
      width: 10,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 10,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 10,
    },
    {
      title: 'Action',
      key: 'action',
      width: 10,
      render: (text, record) => (
        <div className="flex items-center gap-x-[10px] ">
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record._id)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" size="small" className="p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
                />
              </svg>
            </Button>
          </Popconfirm>
          <button type="button" onClick={() => handleEdit(record._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5
