import { Trick } from "../../domain/tricks/Trick";

export const parseTrick = (trick: any): Trick => {
  const { typeId, classPlanId, ...result } = trick;
  return result;
};

export const parseTricks = (tricks: any[]): Trick[] => {
  return tricks.map(parseTrick);
};
