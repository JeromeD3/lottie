"use client"

import { motion } from "framer-motion"
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line } from "recharts"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

const generateData = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]
    const baseValue = Math.sin(i / 2) * 1000 + 3000
    
    return {
      name: month,
      revenue: Math.round(baseValue + Math.random() * 1000),
      profit: Math.round((baseValue * 0.4) + Math.random() * 500),
      orders: Math.round((baseValue * 0.15) + Math.random() * 100),
    }
  })
}

export function ComboChartDemo() {
  const data = useMemo(() => generateData(), [])
  const [activeType, setActiveType] = useState<string | null>(null)

  const chartTypes = [
    { key: 'revenue', name: 'Revenue', color: 'hsl(var(--chart-1))' },
    { key: 'profit', name: 'Profit', color: 'hsl(var(--chart-2))' },
    { key: 'orders', name: 'Orders', color: 'hsl(var(--chart-3))' }
  ]

  return (
    <div className="h-[350px]">
      <div className="flex justify-center gap-4 mb-4">
        {chartTypes.map((type) => (
          <button
            key={type.key}
            className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full transition-all",
              "text-sm hover:opacity-80",
              activeType === type.key ? "bg-secondary" : "hover:bg-secondary/50"
            )}
            onClick={() => setActiveType(activeType === type.key ? null : type.key)}
          >
            <div 
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: type.color }}
            />
            <span>{type.name}</span>
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3"
            className="stroke-muted"
            opacity={0.3}
          />
          <XAxis 
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="left"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-2">
                      {payload.map((entry: any) => (
                        <div key={entry.name} className="flex items-center justify-between gap-8">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {entry.name}
                          </span>
                          <span className="font-bold">
                            {entry.name === 'Orders' 
                              ? entry.value
                              : `$${entry.value?.toLocaleString()}`
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          {(!activeType || activeType === 'revenue') && (
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.2}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
          )}
          {(!activeType || activeType === 'profit') && (
            <Bar
              yAxisId="left"
              dataKey="profit"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          )}
          {(!activeType || activeType === 'orders') && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
} 
