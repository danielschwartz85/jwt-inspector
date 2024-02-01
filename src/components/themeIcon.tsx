import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlined from '@mui/icons-material/WbSunnyOutlined'
import { IconButton } from '@mui/material'

export interface IThemeIconProps {
  isDarkMode: boolean
  onClick: () => void
}

export function ThemeIcon(props: IThemeIconProps) {
  const { isDarkMode, onClick } = props
  return (
    <IconButton
      aria-label="delete"
      sx={(them) => ({ position: 'absolute', top: them.spacing(3), right: them.spacing(3) })}
      onMouseDown={onClick}
    >
      {isDarkMode ? <WbSunnyOutlined color="secondary" /> : <DarkModeOutlined />}
    </IconButton>
  )
}
