export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthDate: string;
  phone: string;
  cep: string;
  street: string;
  province: string;
  city: string;
  state: string;
}

export interface Card {
  id: string;
  number: string;
  cvv: string;
  expireDate: Date;
  user_id: string;
}
