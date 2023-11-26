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
import { axiosInstance } from '@/utils/axiosInstace';

type Props = {
  openParagon: boolean;
  setOpenParagon: React.Dispatch<React.SetStateAction<boolean>>;
  popUpData: any;
  popUpShop: any;
};

const ParagonDialog = ({
  openParagon,
  setOpenParagon,
  popUpData,
  popUpShop,
}: Props) => {
  const handleDeleteShopping = async () => {
    await axiosInstance
      .delete(`http://localhost:5000/api/v1/product/deleteShopping`, {
        params: {
          data: popUpShop.id,
        },
      })
      .then((res) => {
        console.log('Succesfully deleted shopping');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    handleDeleteShopping();
  };

  const handleSave = () => {
    setOpenParagon(false);
  };
  return (
    <Dialog maxWidth="xl" open={openParagon} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        ZATWIERDZENIE PARAGONU
      </DialogTitle>
      <DialogContent>
        <EditSingleParagon popUpData={popUpData} popUpShop={popUpShop} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj dodanie</Button>
        <Button onClick={handleSave}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParagonDialog;
