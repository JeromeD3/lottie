"use client"

import { Area, AreaChart as ReAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
    trend: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
    trend: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
    trend: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
    trend: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
    trend: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
    trend: Math.floor(Math.random() * 3000) + 500,
  },
]

export function AreaChartDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ReAreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between gap-8">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Total
                        </span>
                        <span className="font-bold">
                          ${payload[0].value?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Trend
                        </span>
                        <span className="font-bold">
                          ${payload[1].value?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#total)"
          />
          <Area
            type="monotone"
            dataKey="trend"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#trend)"
          />
        </ReAreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
} 
