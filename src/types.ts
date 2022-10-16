import type { BehaviorSubject } from "rxjs";

export type ApplicationCustomProps = {
  name: string;
  titleObservable: BehaviorSubject<string>;
  themeObservable: BehaviorSubject<string>;
};
