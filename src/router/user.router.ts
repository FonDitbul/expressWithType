import express, {Request, Response, NextFunction} from 'express';
import {getAllUser, getUser} from '../service/user.service'

const router = express.Router();


router.get("/", (req: Request, res: Response, next: NextFunction)=>{
	res.send("All user");
})

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
	console.log(getUser(123))
	res.send('hi')
})


export default router;