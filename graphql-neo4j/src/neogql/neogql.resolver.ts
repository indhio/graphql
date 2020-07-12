import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Connection, node, relation } from 'cypher-query-builder';
import { HOSTNAME, NEO4J_PASSWORD, NEO4J_USER } from '../config';

const db = new Connection(`bolt://${HOSTNAME}`, {
  username: NEO4J_USER,
  password: NEO4J_PASSWORD,
});

@Resolver('Movie')
export class NeogqlResolver {

  @Query()
  async getMovies(): Promise<any> {
    const movies = (await db
      .matchNode('movies', 'Movie')
      .return([
        {
          movies: [{ id: 'id', title: 'title', year: 'year' }],
        },
      ])
      .run()) as any;
    return movies;
  }

  @Query('movie')
  async getMovieById(
    @Args('id')
    id: string,
  ): Promise<any> {
    const movie = (await db
      .matchNode('movie', 'Movie')
      .where({ 'movie.id': id })
      .return([
        {
          movie: [{ id: 'id', title: 'title', year: 'year' }],
        },
      ])
      .run<any>()) as any;
    if (movie.length === 0) {
      throw new NotFoundException(
        `Movie id '${id}' does not exist in database `,
      );
    }
    return movie[0];
  }

  @ResolveProperty()
  async persons(@Parent() movie: any) {
    const { title } = movie;
    return (await db
      .match([node('persons', 'Person'), relation('in'), node('movie', 'Movie')])
      .where({ 'movie.title': title })
      .return([
        {
          persons: [
            {
              id: 'id',
              name: 'name',
              born: 'born',
            },
          ],
        },
      ])
      .run()) as any;
  }
}