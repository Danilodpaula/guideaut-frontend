import { PersonaDto } from "../types/dto/persona";
import { PersonaCreateDto } from "../types/dto/persona-create";
import { PersonaUpdateDto } from "../types/dto/persona-update";
import { crudService } from "./crud-service";
import { Paths } from "./paths";

export const PersonaService = crudService<
  PersonaDto,
  PersonaCreateDto,
  PersonaUpdateDto
>(Paths.PERSONA);
