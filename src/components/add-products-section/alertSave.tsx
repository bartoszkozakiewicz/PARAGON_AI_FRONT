'use client'

import React from 'react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertAccepted: React.Dispatch<React.SetStateAction<boolean>>
    settingButtonsTransition: (buttonName: String) => void
    nextButton: string
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AlertSave = ({open,setOpen,nextButton, setAlertAccepted,settingButtonsTransition}:Props) => {
    
      const handleCloseFalse = () => {
        setAlertAccepted(false)
        setOpen(false);
      };
      const handleCloseTrue = () => {
        console.log("TRUEEEEE")
        settingButtonsTransition(nextButton)
        setAlertAccepted(true)
        setOpen(false);
        
      };

  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleCloseFalse}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Brak zapisu nowych wydatków"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Dane nie zostały dodane. Po przejściu dalej zostaną one usunięte. Czy na pewno chcesz zmienić zakładkę?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseFalse}>NIE</Button>
      <Button onClick={handleCloseTrue}>TAK</Button>
    </DialogActions>
  </Dialog>
  )
}

export default AlertSave
