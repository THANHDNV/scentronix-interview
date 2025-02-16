import { Box, Chip, Paper as MPaper, styled, Typography } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { formatMoney } from "../../utils/format";

const Paper = styled(MPaper)(({ theme: { spacing, breakpoints } }) => ({
  borderRadius: spacing(0.5),
  minHeight: spacing(6),
  [breakpoints.up("md")]: {
    minHeight: spacing(7),
  },
}));

export interface ActionMenuItemProps {
  icon?: React.ReactNode;
  name: string;
  price: number;
  description?: string;
  tags?: string[];
}

export const ActionMenuItem = ({
  icon = <AddShoppingCartRoundedIcon />,
  name,
  price,
  description,
  tags,
}: ActionMenuItemProps) => {
  return (
    <Paper elevation={1}>
      <Box display={"flex"} flexDirection={"column"} gap={2} px={3} py={2}>
        <Box display={"flex"} gap={1} flexDirection={"column"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              {icon}
              <Typography variant={"h6"}>{name}</Typography>
            </Box>
            <Typography variant={"h6"}>{formatMoney(price)}</Typography>
          </Box>
          {!!description && (
            <Typography variant={"subtitle1"}>{description}</Typography>
          )}
        </Box>
        {!!tags && tags.length > 0 && (
          <Box display={"flex"} gap={1}>
            {tags?.map((tag) => (
              <Chip key={tag} variant="square" label={tag} />
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};
