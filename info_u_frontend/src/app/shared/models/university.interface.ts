import { OpportunityI } from './opportunity';

export interface UniversityI {
    id: string,
    title: string,
    img: string,
    careers: Array<string>,
    locations: Array<string>,
    opportunities: Array<OpportunityI>,
    description: string,
    web: string
}