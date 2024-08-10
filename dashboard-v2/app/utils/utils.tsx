import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

export const getCep = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const [_, cep] = queryKey;
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return response.json();
};
