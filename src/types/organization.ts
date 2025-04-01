export interface Organization {
  id: string;
  name: string;
  type: string;
  businessEntity: string;
  agreement: {
    number: string;
    date: string;
  };
} 