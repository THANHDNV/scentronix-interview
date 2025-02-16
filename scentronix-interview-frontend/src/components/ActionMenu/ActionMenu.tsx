import { Box, Button, ButtonProps, Dialog, useTheme } from "@mui/material";
import { ActionMenuItem, ActionMenuItemProps } from "./ActionMenuItem";
import { animated, useSpring } from "@react-spring/web";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import useComponentSize from "@rehooks/component-size";
import { useWindowSize } from "@react-hook/window-size";

const AnimatedButton = animated(Button);

const ActionMenuContent = ({
  open,
  items,
  onClose,
  anchorPosition,
}: {
  open: boolean;
  items: ActionMenuItemProps[];
  onClose: () => void;
  anchorPosition: { top: number; left: number; bottom: number; right: number };
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const TOTAL_PADDING_X = (2 + 11) * 8;
  const TOTAL_PADDING_Y = (2 + 2) * 8;

  const { spacing, shadows, palette } = useTheme();

  const [gapSpring, gapSpringApi] = useSpring(() => ({}), [open]);

  useEffect(() => {
    gapSpringApi.start({
      from: {
        gap: open ? spacing(0) : spacing(2),
      },
      to: {
        gap: open ? spacing(2) : spacing(0),
      },
    });
  }, [gapSpringApi, open, spacing]);

  const size = useComponentSize(ref);
  const [windowWidth, windowHeight] = useWindowSize();

  const isAnchorBottom = useMemo(
    () => anchorPosition.bottom > windowHeight / 2,
    [anchorPosition.bottom, windowHeight]
  );
  const isAnchorRight = useMemo(
    () => anchorPosition.right > windowWidth / 2,
    [anchorPosition.right, windowWidth]
  );

  const position = useMemo(() => {
    const { top, left, bottom, right } = anchorPosition;

    const anchorWidth = right - left;

    const yPosition = isAnchorBottom
      ? { bottom: windowHeight - bottom - 16 }
      : { top: top - 16 };

    if (typeof yPosition.top === "number") {
      if (yPosition.top + size.height + TOTAL_PADDING_Y > windowHeight) {
        yPosition.top = 0;
      }
    }

    if (typeof yPosition.bottom === "number") {
      if (yPosition.bottom + size.height + TOTAL_PADDING_Y > windowHeight) {
        yPosition.bottom = 0;
      }
    }

    const xPosition = isAnchorRight
      ? { right: windowWidth - right - 16 - (28 - anchorWidth / 2) }
      : { left: left - 16 - (28 - anchorWidth / 2) };

    if (typeof xPosition.left === "number") {
      if (xPosition.left + size.width + TOTAL_PADDING_X > windowWidth) {
        xPosition.left = 0;
      }
    }

    if (typeof xPosition.right === "number") {
      if (xPosition.right + size.width + TOTAL_PADDING_X > windowWidth) {
        xPosition.right = 0;
      }
    }

    return {
      ...yPosition,
      ...xPosition,
    };
  }, [
    TOTAL_PADDING_X,
    TOTAL_PADDING_Y,
    anchorPosition,
    isAnchorBottom,
    isAnchorRight,
    size.height,
    size.width,
    windowHeight,
    windowWidth,
  ]);

  const closeButtonPosition = useMemo(() => {
    const { top, bottom, left, right } = anchorPosition;

    const anchorHeight = bottom - top;
    const anchorWidth = right - left;

    const yPosition = isAnchorBottom
      ? {
          bottom: Math.max(16, windowHeight - bottom - (28 - anchorHeight / 2)),
        }
      : {
          top: Math.max(16, top - (28 - anchorHeight / 2)),
        };

    const xPosition = isAnchorRight
      ? {
          right:
            position.right === 0
              ? 16
              : windowWidth - right - (28 - anchorWidth / 2),
        }
      : { left: position.left === 0 ? 16 : left - (28 - anchorWidth / 2) };

    return {
      ...yPosition,
      ...xPosition,
    };
  }, [
    anchorPosition,
    isAnchorBottom,
    isAnchorRight,
    position.left,
    position.right,
    windowHeight,
    windowWidth,
  ]);

  return (
    <Box
      maxHeight={"100vh"}
      maxWidth={"100vw"}
      overflow={"scroll"}
      padding={spacing(2)}
      paddingLeft={isAnchorRight ? spacing(2) : spacing(11)}
      paddingRight={!isAnchorRight ? spacing(2) : spacing(11)}
      boxSizing={"border-box"}
      position={"absolute"}
      style={{
        ...position,
      }}
    >
      <Box
        component={animated.div}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        style={{
          ...gapSpring,
        }}
        ref={ref}
      >
        {items.map((item) => (
          <ActionMenuItem key={item.name} {...item} />
        ))}
      </Box>
      <Button
        onClick={onClose}
        style={{
          background: palette.background.paper,
          color: palette.text.primary,
          borderRadius: "50%",
          boxShadow: shadows[1],
          padding: spacing(2),
          minWidth: "initial",
          position: "fixed",
          ...closeButtonPosition,
        }}
      >
        <ClearRoundedIcon
          style={{
            width: spacing(3),
            height: spacing(3),
          }}
        />
      </Button>
    </Box>
  );
};

interface Props {
  label?: string;
  buttonProps?: ButtonProps;
  items: ActionMenuItemProps[];
}

export const ActionMenu = ({ items, label = "Open", buttonProps }: Props) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const opacitySpring = useSpring({
    opacity: !open ? 1 : 0,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<{
    top: number;
    left: number;
    bottom: number;
    right: number;
  }>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });

  return (
    <Fragment>
      <AnimatedButton
        onClick={() => {
          setOpen(true);

          if (buttonRef.current) {
            const { top, bottom, left, right } =
              buttonRef.current.getBoundingClientRect();

            anchorRef.current = { top, bottom, left, right };
          }
        }}
        variant={"contained"}
        ref={buttonRef}
        size={"large"}
        {...buttonProps}
        style={{
          ...opacitySpring,
          ...(buttonProps?.style ?? {}),
        }}
      >
        {label}
      </AnimatedButton>
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={({ children }) => children}
      >
        <ActionMenuContent
          open={open}
          items={items}
          onClose={onClose}
          anchorPosition={anchorRef.current}
        />
      </Dialog>
    </Fragment>
  );
};
