'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { DateRangePicker } from 'react-date-range';

type Props = {
  open: boolean;
  handleClose: any;
  dateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  setDateRange: Dispatch<
    SetStateAction<{
      startDate: Date;
      endDate: Date;
      key: string;
    }>
  >;
  getData: (firstDate: string, secondDate: String) => Promise<void>;
};

const MyDatePickerModal = ({
  open,
  handleClose,
  dateRange,
  setDateRange,
  getData,
}: Props) => {
  const handleDateChange = (ranges: any) => {
    setDateRange((prevData) => ({
      ...prevData,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    }));
  };

  const handleSave = () => {
    // Tutaj możesz dodać kod obsługi zapisywania daty
    handleClose();
    // Pobierz poszczególne elementy daty
    const year_1 = dateRange.startDate.getFullYear();
    const month_1 = String(dateRange.startDate.getMonth() + 1).padStart(2, '0'); // Dodaj +1, ponieważ miesiące są numerowane od 0 do 11
    const day_1 = String(dateRange.startDate.getDate()).padStart(2, '0');
    const dateStart = `${year_1}-${month_1}-${day_1}`;

    const year_2 = dateRange.endDate.getFullYear();
    const month_2 = String(dateRange.endDate.getMonth() + 1).padStart(2, '0'); // Dodaj +1, ponieważ miesiące są numerowane od 0 do 11
    const day_2 = String(dateRange.endDate.getDate()).padStart(2, '0');
    const dateEnd = `${year_2}-${month_2}-${day_2}`;

    getData(dateStart, dateEnd);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Wybierz zakres dat</DialogTitle>
      <DialogContent>
        <DateRangePicker ranges={[dateRange]} onChange={handleDateChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button onClick={handleSave}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDatePickerModal;
