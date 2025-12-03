import { ScriptDto } from "../types/dto/script";
import { ScriptCreateDto } from "../types/dto/script-create";
import { ScriptUpdateDto } from "../types/dto/script-update";
import { crudService } from "./crud-service";
import { Paths } from "./paths";

export const ScriptService = crudService<
  ScriptDto,
  ScriptCreateDto,
  ScriptUpdateDto
>(Paths.SCRIPTS);
