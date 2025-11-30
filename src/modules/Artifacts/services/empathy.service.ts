import { EmpathyDto } from "../types/dto/empathy";
import { EmpathyCreateDto } from "../types/dto/empathy-create";
import { EmpathyUpdateDto } from "../types/dto/empathy-update";
import { crudService } from "./crud-service";
import { Paths } from "./paths";

export const EmpathyService = crudService<
  EmpathyDto,
  EmpathyCreateDto,
  EmpathyUpdateDto
>(Paths.EMPATHY);
