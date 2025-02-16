import { StoryObj, Meta } from "@storybook/react";
import { ActionMenuItem } from "../components/ActionMenu/ActionMenuItem";
import CoffeeMakerRoundedIcon from "@mui/icons-material/CoffeeMakerRounded";

const meta = {
  title: "Components/ActionMenuItem",
  component: ActionMenuItem,
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    name: "Espresso",
    price: 2.5,
  },
};

export const WithDescriptionAndTags: Story = {
  args: {
    name: "Espresso",
    price: 2.5,
    description: "A short, strong coffee",
    tags: ["strong", "short", "coffee"],
  },
};

export const WithDescriptionOnly: Story = {
  args: {
    name: "Espresso",
    price: 2.5,
    description: "A short, strong coffee",
  },
};

export const WithTagsOnly: Story = {
  args: {
    name: "Espresso",
    price: 2.5,
    tags: ["strong", "short", "coffee"],
  },
};

export const WithDifferentIcon: Story = {
  args: {
    name: "Espresso",
    price: 2.5,
    icon: <CoffeeMakerRoundedIcon />,
  },
};
