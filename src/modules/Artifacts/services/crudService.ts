import api from "@/api/client";

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
