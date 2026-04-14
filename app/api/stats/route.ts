import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    totalOrders: 2847,
    happyCustomers: 2690,
    avgRating: 4.9,
    totalReviews: 634,
    onTimeRate: 98.5,
    citiesCovered: 12,
  })
}
