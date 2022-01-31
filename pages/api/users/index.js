import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/Users';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET':
      try{
        const users = await User.find({});
        
        res.status(200).json({ status: 'success', data: users })
      } catch (error) {
        res.status(400).json({status: 'server error'})
      }
      break;
    case 'POST':
      try {
        const user = await User.create(req.body);
        res.status(200).json({status: 'success', data: user})
      } catch (error) {
        res.status(400).json({status: 'failed'})
        console.log(error)
      }
      break;
    default:
      res.status(400).json({status: 'access failed'})
      break;
  }
}