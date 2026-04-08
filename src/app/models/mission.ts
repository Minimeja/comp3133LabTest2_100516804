export interface Mission {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  details: string | null;
  flight_number: number;
  links: {
    wikipedia?: string;
    webcast?: string;
    article?: string;
    patch?: {
      small?: string;
      large?: string;
    };
  };
}