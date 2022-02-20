import React from "react";
import { Series } from "@/types";
import FrameSwitcher from "@/components/FrameSwitcher";

type SeriesSwitcherProps = {
  seriesList: Series[];
  selected?: Series;
  onChange: (series: Series) => void;
  placeholder: React.ReactNode;
};

const SeriesSwitcher = ({
  seriesList,
  selected,
  onChange,
  placeholder,
}: SeriesSwitcherProps) => {
  return (
    <FrameSwitcher<Series>
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
type NewSeriesSwitcherProps = {
  seriesList: Series[];
  selected?: Series;
  onChange: (series: Series) => void;
  placeholder: React.ReactNode;
};
const NewSeriesSwitcher = ({
  seriesList,
  selected,
  onChange,
  placeholder,
}: SeriesSwitcherProps) => {};
