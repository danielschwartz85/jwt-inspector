import { Paper, styled } from '@mui/material'
import Grid from '@mui/material/Grid'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  borderStyle: 'dotted',
}))

function App() {
  return (
    <Grid container sx={{ px: 4, py: 4 }} spacing={2}>
      <Grid item md={8} xs={12}>
        <Item sx={{ height: '400px' }}>jwt</Item>
      </Grid>
      <Grid item md={4} xs={12}>
        <Item sx={{ height: '400px' }}>See jwt</Item>
      </Grid>
      <Grid item md={12} xs={12}>
        <Item>footer</Item>
      </Grid>
    </Grid>
  )
}

export default App
