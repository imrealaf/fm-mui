import { useTheme, useMediaQuery } from "@mui/material";

/**
 * useBreakpoint
 * @description utility for getting current breakpoint
 */

function useBreakpoint() {
  const theme = useTheme();
  return {
    xs: useMediaQuery(theme.breakpoints.only("xs")),
    sm: useMediaQuery(theme.breakpoints.only("sm")),
    smAndDown: useMediaQuery(theme.breakpoints.down("sm")),
    smAndUp: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.only("md")),
    mdAndDown: useMediaQuery(theme.breakpoints.down("md")),
    mdAndUp: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.only("lg")),
    lgAndDown: useMediaQuery(theme.breakpoints.down("lg")),
    lgAndUp: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.only("xl")),
    xlAndDown: useMediaQuery(theme.breakpoints.down("xl")),
    xlAndUp: useMediaQuery(theme.breakpoints.up("xl")),
  };
}

export default useBreakpoint;
