import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/Users'

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  switch(method) {
    case 'GET':
      try {
        const user = await User.findById(id);

        if (!user) {
          return res
            .status(400)
            .json({ status: 'failed', message: 'data not found' });
        } 

        res
          .status(200)
          .json({ status: 'success', data: user })
      } catch (error) {
        res
          .status(400)
          .json({ status: 'server error' })
        console.log(error)
      }
      break;
    case 'PUT':
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators:true
        })

        if (!user) {
          return res
          .status(400)
          .json({ status: 'failed', message: 'data not found' });
        }

        res
          .status(200)
          .json({ status: 'success', data: user })
      } catch (error) {
        res
          .status(400)
          .json({ status: 'server error' })
      }
      break;
    case 'DELETE':
      try {
        const deletedUser = await User.deleteOne({ _id: id});

        if(!deletedUser) {
          return res
          .status(400)
          .json({ status: 'failed', message: 'data not found' });
        }

        res
          .status(200)
          .json({ status: 'success' })
      } catch(error) {
        res
          .status(400)
          .json({ status: 'server error' })
      }
      break;
    default:
      res
          .status(400)
          .json({ status: 'failed', message: 'wrong method' })
      break;
  }
}