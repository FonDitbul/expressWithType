import { Sequelize } from "sequelize";
import dbConfig from '../config/rdb.config';

export default (): Sequelize => {
	const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
		host: dbConfig.HOST,
		dialect: 'postgres',
		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle
		}
	});
	return sequelize
}