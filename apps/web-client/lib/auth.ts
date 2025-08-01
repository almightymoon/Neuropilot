import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(payload: JWTPayload): string {
    const secret = process.env.JWT_SECRET || 'fallback-secret'
    return jwt.sign(payload, secret, { expiresIn: '7d' })
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      const secret = process.env.JWT_SECRET || 'fallback-secret'
      return jwt.verify(token, secret) as JWTPayload
    } catch (error) {
      return null
    }
  }

  static async createSession(userId: string, token: string, ipAddress?: string, userAgent?: string): Promise<void> {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

    await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
        ipAddress,
        userAgent,
      },
    })
  }

  static async validateSession(token: string): Promise<boolean> {
    const session = await prisma.session.findFirst({
      where: {
        token,
        isActive: true,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    return !!session
  }

  static async invalidateSession(token: string): Promise<void> {
    await prisma.session.updateMany({
      where: { token },
      data: { isActive: false },
    })
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        settings: true,
        subscription: true,
      },
    })
  }

  static async createUser(userData: {
    email: string
    password: string
    firstName?: string
    lastName?: string
  }) {
    const hashedPassword = await this.hashPassword(userData.password)

    return prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        settings: {
          create: {
            theme: 'LIGHT',
            language: 'en',
            notifications: true,
            emailNotifications: true,
            aiModelPreference: 'auto',
            maxMemorySize: 10,
            autoSave: true,
          },
        },
        subscription: {
          create: {
            plan: 'FREE',
            status: 'ACTIVE',
          },
        },
      },
      include: {
        settings: true,
        subscription: true,
      },
    })
  }
} 