import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { ISavedSecret } from '../../src/state'

export interface IConfirmDeleteDialog {
  secret?: ISavedSecret
  handleClose: () => void
  handleDelete: () => void
}

export default function ConfirmDeleteDialog(props: IConfirmDeleteDialog) {
  const { secret, handleClose, handleDelete } = props
  return (
    <Dialog open={!!secret} onClose={handleClose} aria-labelledby="confirm-delete-dialog-title">
      <DialogTitle id="confirm-delete-dialog-title">{`Delete ${secret?.label} ?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The secret will be permanently deleted
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
