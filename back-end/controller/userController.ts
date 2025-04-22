import db from "../Database"
export const getUserList = async(req:any, res:any) => {
 try{
  const userData = await db('user').select('*');
  userData.forEach((user:any) => {
    user.create_time = new Date(user.create_time).toLocaleString();
  })
  res.json({
    success: true,
    data: userData,
    message: 'get user list success',
    code:200,
  })
 }catch(err){
  res.json({
    success: false,
    data: null,
    message: 'get user list failed',
    code:500,
  });
  return Promise.reject(err);
 }
}