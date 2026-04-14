import path from 'node:path'
import type { PrismaConfig } from 'prisma'
import { PrismaPg } from '@prisma/adapter-pg'

export default {
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    adapter: () => {
      const { Pool } = require('pg')
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      })
      return new PrismaPg(pool)
    },
  },
} satisfies PrismaConfig