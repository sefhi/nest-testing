import { Pool } from 'pg';
import { User } from '../../../Domain/Entities/User';
import { UserRepository } from '../../../Domain/Repositories/UserRepository';

interface UserRow {
  id: string;
  email: string;
  name: string;
}

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async store(user: User): Promise<void> {
    const query = `
      INSERT INTO "user" (id, email, name)
      VALUES ($1, $2, $3)
    `;
    //TODO implement logic update
    /*await this.pool.query(query, [
      user.id.value,
      user.email.value,
      user.name.value,
    ]); */
    return Promise.resolve(undefined);
  }
  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT id, email, name
      FROM "user"
      WHERE email = $1
    `;

    const result = await this.pool.query<UserRow>(query, [email]);

    if (result.rows.length === 0) {
      return Promise.resolve(null);
    }

    const { id, email: userEmail, name } = result.rows[0];
    return User.create(id, userEmail, name);
  }
}
