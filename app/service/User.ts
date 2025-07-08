import pool from '../db';

export class UserService {
  static async getAllUsers() {
    const result = await pool.query('SELECT * FROM vendors');
    return result.rows;
  }

}