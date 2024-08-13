import { Card, User } from '@/app/types';
import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

const uri = 'http://127.0.0.1:8000/api';

export type UserFields =
  | 'name'
  | 'surname'
  | 'email'
  | 'birthDate'
  | 'phone'
  | 'cep'
  | 'street'
  | 'province'
  | 'city';

export type CardFields = 'number' | 'cvv' | 'expireDate' | 'user_id';

interface SaveUserResponse {
  message: string;
  data?: string;
  errors: Record<UserFields, string[]>;
}

interface SaveCardResponse {
  message: string;
  data?: string;
  errors: Record<CardFields, string[]>;
}

export const getAge = (dateString: string) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const getCep = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const [_, cep] = queryKey;
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${uri}/user`);
  return response.json();
};

export const getUser = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const [_, id] = queryKey;
  const response = await fetch(`${uri}/user/${id}`);
  return response.json();
};

export const saveUser = async (data: Omit<User, 'id'>) => {
  const response = await fetch(`${uri}/user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return (await response.json()) as SaveUserResponse;
};
export const deleteUser = async (id: string) => {
  const response = await fetch(`${uri}/user/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const getCard = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const [_, id] = queryKey;
  const response = await fetch(`${uri}/card/${id}`);
  return response.json();
};

export const saveCard = async (data: Omit<Card, 'id'>) => {
  const response = await fetch(`${uri}/card`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return (await response.json()) as SaveCardResponse;
};

export const deleteCard = async (id: string) => {
  const response = await fetch(`${uri}/card/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};
