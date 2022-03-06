import { connect } from 'mongoose';
export default async (): Promise<any> => {
	const connection = await connect('mongodb://localhost:27017/testserver')
	return connection.connection.db;
}