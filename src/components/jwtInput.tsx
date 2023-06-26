import TextField from '@mui/material/TextField'

export default function JwtInput() {
  return (
    <TextField
      id="outlined-multiline-static"
      placeholder="Paste JWT.."
      multiline
      rows={10}
      fullWidth={true}
    />
  )
}
