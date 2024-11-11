import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new Error('No token provided')
    
    const decoded = verify(token, process.env.JWT_SECRET!)
    req.user = decoded
    
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
} 