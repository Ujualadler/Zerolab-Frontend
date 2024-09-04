import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  background: '#022326',
  border: '2px solid #000',
  // boxShadow: 24,
  borderRadius:3,
  padding: 2,
};

interface ConfirmationProps {
  open: boolean;
  show: (value: boolean) => void;
  handle?: any;
  
}

export default function ConfirmationModal({show,open,handle}:ConfirmationProps) {
 // Added type annotation for useState

 
  const handleClose = () => show(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display:'flex',flexDirection:'column'}}>
            <Typography my={2} color={'white'}>
            Are you sure you want to save this Lead Detail?
            </Typography>
            <Box sx={{display:'flex',width:'100%',alignItems:'center',gap:2}}>
              <Button variant='contained' size='small' sx={{width:'50%',background:'#4D9900'}} onClick={handleClose}>Cancel</Button>
              <Button variant='contained' size='small' sx={{width:'50%',background:'#4D9900'}} onClick={()=>handle()}>Save</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
