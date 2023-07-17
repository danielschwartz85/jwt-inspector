import TextField, { TextFieldProps } from '@mui/material/TextField'
import CopyButton from './copyButton'
import { useState } from 'react'

export type ITextFieldCopyProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string) => void
}

export default function TextFieldCopy(props: ITextFieldCopyProps) {
  const { value, error, onChange, ...rest } = props
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TextField
      {...rest}
      // If we use "DefaultValue" we can't control the TextField
      // If we use "value" in the TextField then we loose undo/redo and have a cursor bug.
      defaultValue={isHovered ? value : undefined}
      value={!isHovered ? value : undefined}
      multiline
      error={error}
      fullWidth={true}
      spellCheck={false}
      onChange={(e) => onChange(e.target.value)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // TODO - padding right to the textarea
      InputProps={{ endAdornment: <CopyButton value={value} visible={!error && isHovered} /> }}
    />
  )
}
