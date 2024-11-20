import { styled } from "@mui/material/styles";
import { Container, Card } from "@mui/material";

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export const ContentCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  borderRadius: theme.shape.borderRadius * 1.5,
}));
