import React from "react";
import { Series } from "@/types";
import { Typography } from "@mui/material";

type Props = {
  series: Series;
};

const SeriesCard = ({ series }: Props) => {
  return <Typography variant="subtitle1">{series.title}</Typography>;
};

export default SeriesCard;
