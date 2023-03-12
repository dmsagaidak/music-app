import React from 'react';
import { LinearProgress, Stack } from '@mui/material';

const Progress = () => {
  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <LinearProgress />
    </Stack>
  );
};

export default Progress;
