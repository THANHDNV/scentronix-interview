import { Box, ThemeProvider } from "@mui/material";
import { materialUITheme } from "./config/materialUI";
import { ActionMenu } from "./components/ActionMenu/ActionMenu";
import { MENU_ITEMS } from "./data/menuItem";

function App() {
  return (
    <ThemeProvider theme={materialUITheme}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        padding={`calc(${materialUITheme.spacing(2)} - 8px)`}
        height={"calc(100vh - 16px)"}
        boxSizing={"border-box"}
      >
        <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
          <ActionMenu items={MENU_ITEMS} />
        </Box>

        <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
          <ActionMenu items={MENU_ITEMS} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
