import React from 'react';
import { toast } from 'react-toastify';

import { Pagination, ToastContainer } from 'components/Foundation';

const story = {
  title: 'Components/Pagination',
  component: Pagination,
};

function Default(args) {
  return (
    <div className="w-50 mt-3">
      <ToastContainer />
      <Pagination {...args} />
    </div>
  );
}

export const Basic = Default.bind({});

Basic.args = {
  hideOnSinglePage: true,
  total: 40,
};

export const WithEllipsis = Default.bind({});

WithEllipsis.args = {
  total: 70,
  currentPage: 4,
};

export const WithHandler = Default.bind({});

WithHandler.args = {
  total: 50,
  pageSize: 5,
  onChange(page) {
    toast(`Current page: ${page}`, {
      type: 'info',
      closeButton: false,
    });
  },
};

export function WithResultStats(args) {
  return (
    <div className="w-100 mt-3">
      <Pagination {...args} />
    </div>
  );
}

WithResultStats.args = {
  total: 200,
  currentPage: 10,
  showResultStats: true,
};

export default story;
