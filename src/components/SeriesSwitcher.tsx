import React from "react";
import { SeriesInfo } from "@/types";
import FrameSwitcher from "@/components/FrameSwitcher";

type SeriesSwitcherProps = {
  seriesList: SeriesInfo[];
  selected?: SeriesInfo;
  onChange: (series: SeriesInfo) => void;
  placeholder: React.ReactNode;
};

const SeriesSwitcher = ({
  seriesList,
  selected,
  onChange,
  placeholder,
}: SeriesSwitcherProps) => {
  return (
    <FrameSwitcher<SeriesInfo>
      options={seriesList}
      onChange={onChange}
      selected={selected}
      placeholder={placeholder}
      renderButton={(series) => series.title}
      renderKey={(series) => series.id}
      renderSelected={(series) => series.title}
      renderUnselected={(series) => series.title}
    />
  );
};
export default SeriesSwitcher;
