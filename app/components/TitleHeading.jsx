import { Box, Typography } from "@mui/material";

export default function TitleHeading({ title, subTitle, height }) {
  return (
    <Box
      height={height}
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      flexGrow={1}
      display="flex"
    >
      <Typography variant="h5">{title}</Typography>
      <Typography>{subTitle}</Typography>
    </Box>
  );
}
