import { Location, NavigateFunction } from "react-router-dom";

interface IHistory {
  navigate: NavigateFunction | null;
  location: Location | null;
}

export const HISTORY: IHistory = {
  navigate: null,
  location: null,
};
