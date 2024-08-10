export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthDate: Date;
  address: {
    cep: number;
    street: string;
    district: string;
    city: string;
    state: string;
  };
  phone: string;
}

export interface Card {
  number: number;
  expireDate: Date;
  cvv: number;
}
