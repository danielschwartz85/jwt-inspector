import TextField, { TextFieldProps } from '@mui/material/TextField'
import CopyButton from './copyButton'
import { useState } from 'react'

export type ITextFieldCopyProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string) => void
  ariaLabel?: string
}

export default function TextFieldCopy(props: ITextFieldCopyProps) {
  const { value, error, onChange, ariaLabel, ...rest } = props
  const [isActive, setIsActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsActive(true)
    rest.onFocus?.(e)
  }
  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsActive(false)
    rest.onBlur?.(e)
  }
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true)
    rest.onMouseEnter?.(e)
  }
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false)
    rest.onMouseEnter?.(e)
  }

  return (
    <TextField
      {...rest}
      // If we use "DefaultValue" we can't control the TextField
      // If we use "value" in the TextField then we loose undo/redo and have a cursor bug.
      defaultValue={isActive ? value : undefined}
      value={!isActive ? value : undefined}
      multiline
      error={error}
      fullWidth={true}
      spellCheck={false}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{ '& textarea.MuiInputBase-inputMultiline': { mr: 5 } }}
      inputProps={ariaLabel ? { 'aria-label': ariaLabel } : undefined}
      InputProps={{
        endAdornment: <CopyButton value={value} visible={!error && isHovered} />,
      }}
    />
  )
}
