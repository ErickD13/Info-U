import { CareerI } from './career.interface';

export interface FacultyI {
    id: string,
    title: string,
    description: string,
    img: string,
    link: string,
    careers: Array<CareerI>
}