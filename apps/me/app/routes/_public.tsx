import { Outlet } from 'react-router';

import { Box } from '@pittorica/react';

export default function PublicLayout() {
  return (
    <Box id="top">
      <Outlet />
    </Box>
  );
}
