import { Box } from "@mui/material";
import { ActionMenu } from "../components/ActionMenu/ActionMenu";
import { Meta, StoryObj } from "@storybook/react";
import { MENU_ITEMS } from "../data/menuItem";

const meta = {
  title: "Components/ActionMenu",
  component: ActionMenu,
  decorators: [
    (Story: any) => (
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        boxSizing={"border-box"}
        height={"calc(100vh - 32px)"}
        p={5}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Story />
          <Story />
        </Box>

        <Box display={"flex"} justifyContent={"space-between"}>
          <Story />
          <Story />
        </Box>
      </Box>
    ),
  ],
} as Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    items: MENU_ITEMS,
  },
};

export const WithLabel: Story = {
  args: {
    items: MENU_ITEMS,
    label: "Open menu",
  },
};

export const WithButtonProps: Story = {
  args: {
    items: MENU_ITEMS,
    label: "Open menu",
    buttonProps: {
      color: "secondary",
    },
  },
};
