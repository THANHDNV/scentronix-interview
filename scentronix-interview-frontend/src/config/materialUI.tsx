import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import {} from "@mui/material/";

export const materialUITheme = createTheme({
  spacing: 8,
  typography: {
    subtitle1: {
      color: grey[600],
    },
  },
  components: {
    MuiChip: {
      variants: [
        {
          props: { variant: "square" },
          style: {
            borderRadius: "4px",
          },
        },
      ],
    },
  },
});
