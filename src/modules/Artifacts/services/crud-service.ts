import api from "@/api/client";
import { EmpathyDto } from "../types/dto/empathy";
import { EmpathyCreateDto } from "../types/dto/empathy-create";
import { EmpathyUpdateDto } from "../types/dto/empathy-update";
import { Paths } from "./paths";
import { PersonaDto } from "../types/dto/persona";
import { PersonaCreateDto } from "../types/dto/persona-create";
import { PersonaUpdateDto } from "../types/dto/persona-update";
import { ScriptDto } from "../types/dto/script";
import { ScriptCreateDto } from "../types/dto/script-create";
import { ScriptUpdateDto } from "../types/dto/script-update";

const crudService = <Entity, CreateDto, UpdateDto>(basePath: string) => {
  const pathId = (id: string) => `${basePath}/${id}`;

  return {
    create: async (data: CreateDto): Promise<Entity> => {
      const result = await api.post(basePath, data);
      return result.data;
    },

    update: async (id: string, data: UpdateDto): Promise<Entity> => {
      const result = await api.put(pathId(id), data);
      return result.data;
    },

    findAll: async (): Promise<Entity[]> => {
      const result = await api.get(basePath);
      return result.data;
    },

    findOne: async (id: string): Promise<Entity> => {
      const result = await api.get(pathId(id));
      return result.data;
    },

    remove: async (id: string): Promise<Entity> => {
      const result = await api.delete(pathId(id));
      return result.data;
    },
  };
};

const EmpathyService = crudService<
  EmpathyDto,
  EmpathyCreateDto,
  EmpathyUpdateDto
>(Paths.EMPATHY);
const PersonaService = crudService<
  PersonaDto,
  PersonaCreateDto,
  PersonaUpdateDto
>(Paths.PERSONA);
const ScriptService = crudService<ScriptDto, ScriptCreateDto, ScriptUpdateDto>(
  Paths.SCRIPTS,
);

export { EmpathyService, PersonaService, ScriptService };
