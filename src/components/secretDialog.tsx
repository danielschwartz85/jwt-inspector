import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

export interface SecretDialogProps {
  isOpen: boolean
  handleClose: () => void
  handleSave: () => void
}

enum EExpiration {
  Hour = 'Hour',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}
const DefaultFormState = {
  label: '',
  value: '',
  expiration: EExpiration.Week,
  isError: false,
}

export default function SecretDialog(props: SecretDialogProps) {
  const { isOpen, handleClose, handleSave } = props
  const [state, setState] = useState(DefaultFormState)

  useEffect(() => {
    setState(DefaultFormState)
  }, [isOpen])

  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, label: e.target.value }))
  }

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, value: e.target.value }))
  }

  const onExpirationChange = (e: SelectChangeEvent<EExpiration>) => {
    setState((state) => ({ ...state, expiration: e.target.value as EExpiration }))
  }

  const handleSaveClick = () => {
    if (!state.label || !state.value) {
      setState((state) => ({ ...state, isError: true }))
      return
    }
    // TODO: convert expiration and call handleSave with label + expiration + value
    alert('not supported yet, coming soon..')
    handleSave()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Save secret</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The secret will be saved in local storage and deleted after the expiration date.
        </DialogContentText>
        <DialogContentText>Note: saved secret are not visible</DialogContentText>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', mt: 1 }}>
          <TextField
            helperText=" "
            required
            value={state.label}
            onChange={onLabelChange}
            error={state.isError && !state.label}
            autoFocus
            id="label"
            label="Label"
            variant="standard"
          />
          <TextField
            helperText=" "
            required
            value={state.value}
            error={state.isError && !state.value}
            onChange={onValueChange}
            id="secret"
            label="Value"
            variant="standard"
          />
          <FormControl>
            <Select value={state.expiration} variant="standard" onChange={onExpirationChange}>
              <MenuItem value={EExpiration.Hour}>1 hour</MenuItem>
              <MenuItem value={EExpiration.Day}>1 day</MenuItem>
              <MenuItem value={EExpiration.Week}>1 week</MenuItem>
              <MenuItem value={EExpiration.Month}>1 month</MenuItem>
              <MenuItem value={EExpiration.Year}>1 year</MenuItem>
            </Select>
            <FormHelperText>Keep for</FormHelperText>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
