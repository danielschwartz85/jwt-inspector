import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { ContentCopy } from '@mui/icons-material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import Typography from '@mui/material/Typography'

export interface ICopyButtonProps {
  value?: unknown
  visible?: boolean
}

export default function CopyButton(props: ICopyButtonProps) {
  const { value, visible = true } = props
  const [openTooltip, setTooltipOpen] = useState(false)

  const handleClickCopy = () => {
    if (!value) return
    navigator.clipboard.writeText(value.toString())
    handleTooltipOpen()
  }

  const handleMouseDownCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleTooltipClose = () => {
    setTooltipOpen(false)
  }

  const handleTooltipOpen = () => {
    setTooltipOpen(true)
    setTimeout(() => setTooltipOpen(false), 350)
  }

  return (
    <InputAdornment
      position="end"
      sx={(theme) => ({
        position: 'absolute',
        top: theme.spacing(4),
        right: theme.spacing(3),
        visibility: visible && value ? undefined : 'hidden',
      })}
    >
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={openTooltip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={<Typography fontSize={'subtitle2.fontSize'}>{'Copied ✓'}</Typography>}
          >
            <IconButton
              aria-label="copy input"
              onClick={handleClickCopy}
              onMouseDown={handleMouseDownCopy}
              edge="end"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: 'primary.main',
                },
              }}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </InputAdornment>
  )
}
