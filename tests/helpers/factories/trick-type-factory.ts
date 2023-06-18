import crypto from "crypto";
import makeTrickTypeRepository from "../../../src/infra/repositories/trick-type-repository";

export const getNewTrickType = async (name?: string) => {
  const ticketTypeRepository = makeTrickTypeRepository();

  return await ticketTypeRepository.store({
    name: name ?? `TicketType_${crypto.randomUUID()}`,
  });
};
