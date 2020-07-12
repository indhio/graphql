
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Movie {
    id: string;
    title: string;
    persons?: Person[];
}

export class Person {
    id: string;
    name: string;
    born: string;
    movie?: Movie[];
}

export abstract class IQuery {
    abstract getMovies(): Movie[] | Promise<Movie[]>;

    abstract movie(id: string): Movie | Promise<Movie>;

    abstract getPerson(): Person[] | Promise<Person[]>;

    abstract person(id: string): Person | Promise<Person>;
}
