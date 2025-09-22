import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

interface DashBoardCardProps {
  title: string
  value: string
  percentage: string
  subtitle: string
  icon: React.ReactNode
  className?: string
}

export default function DashBoardCard({ title, value, percentage, subtitle, icon, className }: DashBoardCardProps) {
  return (
    <Card className={cn("@container/card", className)}>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value}</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +{percentage}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {percentage} <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{subtitle}</div>
        </CardFooter>
      </Card>
  )
}