import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Save } from '@mui/icons-material'

function NewSecret(props: AutocompleteRenderInputParams) {
  const handleClickShowPassword = () => alert('saved!')

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <Save />
            </IconButton>
          </InputAdornment>
        ),
      }}
      label="YOUR-SECRET-HERE"
    />
  )
}

export default function Secret() {
  return (
    <>
      <StyledHeader variant="h5">{'Secret'}</StyledHeader>
      <StyledCard>
        <Autocomplete
          freeSolo
          options={
            [
              // { label: 'cnc', id: '12345' },
              // { label: 'lala', id: 'lala' },
            ]
          }
          disableClearable
          renderInput={(params) =>
            <TextField label="YOUR-SECRET-HERE" {...params} /> || <NewSecret {...params} />
          }
          sx={{ width: '50%' }}
        />
      </StyledCard>
    </>
  )
}
