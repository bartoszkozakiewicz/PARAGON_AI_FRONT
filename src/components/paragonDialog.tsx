'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import EditSingleParagon from './edit-single-paragon';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

type Props = {
  openParagon: boolean;
  setOpenParagon: React.Dispatch<React.SetStateAction<boolean>>;
};

const ParagonDialog = ({ openParagon, setOpenParagon }: Props) => {
  const handleClose = () => {
    setOpenParagon(false);
  };

  const handleSave = () => {
    handleClose();
  };
  return (
    <Dialog maxWidth="md" open={openParagon} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        ZATWIERDZENIE PARAGONU
      </DialogTitle>
      <DialogContent>
        <EditSingleParagon />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button onClick={handleSave}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParagonDialog;
