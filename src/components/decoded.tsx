import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'
import { jsonPrettyStr, safeJsonParse } from '../src/util'
import { useState } from 'react'

export interface IDecodedProps {
  payload: string
  header: string
  onPayloadChange: (payload: string) => void
  onHeaderChange: (header: string) => void
}

export function isValid(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

export default function JwtInput(props: IDecodedProps) {
  const { payload, header, onHeaderChange, onPayloadChange } = props
  // If we use "value" in the TextField then we loose undo/redo and have a cursor bug.
  // if we use "DefaultValue" we can't control the TextField (can't prettify json), so
  // we keep a state for edit state.
  const [focusedOn, setFocusedOn] = useState<'payload' | 'header'>()

  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const obj = safeJsonParse(e.target.value)
    const pretty = obj ? jsonPrettyStr(obj) : undefined
    if (!pretty) {
      return
    }
    if (e.target.id === 'header') {
      onHeaderChange(pretty)
    }
    if (e.target.id === 'payload') {
      onPayloadChange(pretty)
    }
    setFocusedOn(undefined)
  }

  return (
    <>
      <StyledHeader variant="h4">{'Decoded'}</StyledHeader>
      <StyledCard>
        <Stack spacing={1}>
          <TextField
            spellCheck={false}
            id="header"
            multiline
            minRows={4}
            maxRows={8}
            fullWidth={true}
            defaultValue={focusedOn === 'header' ? header : undefined}
            value={focusedOn !== 'header' ? header : undefined}
            error={!isValid(header)}
            onChange={(e) => onHeaderChange(e.target.value)}
            onBlur={onBlur}
            onFocus={() => setFocusedOn('header')}
          />
          <TextField
            spellCheck={false}
            id="payload"
            multiline
            minRows={8}
            maxRows={12}
            fullWidth={true}
            defaultValue={focusedOn === 'payload' ? payload : undefined}
            value={focusedOn !== 'payload' ? payload : undefined}
            error={!isValid(payload)}
            onChange={(e) => onPayloadChange(e.target.value)}
            onBlur={onBlur}
            onFocus={() => setFocusedOn('payload')}
          />
        </Stack>
      </StyledCard>
    </>
  )
}
