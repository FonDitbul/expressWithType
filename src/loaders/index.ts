import expressLoader from './express';
import mongooseLoader from './mongoose';

// loader 정의 (ex: Express, DB)
// @ts-ignore
export default async ({ expressApp }) =>{
	const mongoConnection = await mongooseLoader();
	console.log('MongoDB loaded');

	await expressLoader({ app: expressApp });
	console.log('✌️ Express loaded');
}