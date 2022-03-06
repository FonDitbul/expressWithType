import expressLoader from './express';


// loader 정의 (ex: Express, DB)
// @ts-ignore
export default async ({ expressApp }) =>{
	await expressLoader({ app: expressApp });
	console.log('✌️ Express loaded');
}