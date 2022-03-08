import expressLoader from './express';
import mongooseLoader from './mongoose';
import sequlizeLoader from './sequlize';
// loader 정의 (ex: Express, DB)
// @ts-ignore
export default async ({ expressApp }) =>{
	await sequlizeLoader();
	console.log('Sequlized Loaded');
	await mongooseLoader();
	console.log('MongoDB loaded');

	await expressLoader({ app: expressApp });
	console.log('✌️ Express loaded');
}