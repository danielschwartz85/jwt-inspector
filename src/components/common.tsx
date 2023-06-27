import { Card, CardContent, Typography, styled } from '@mui/material'
import React from 'react'

export const StyledHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

export function StyledCard({ children }: { children?: React.ReactElement }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
