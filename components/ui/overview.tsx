"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { motion } from "framer-motion"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 300,
  },
]

export function Overview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
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
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            className="stroke-muted" 
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
                          Sales
                        </span>
                        <span className="font-bold">
                          ${payload[1].value?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Profit
                        </span>
                        <span className="font-bold">
                          ${payload[2].value?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-[hsl(var(--chart-1))]"
          />
          <Bar
            dataKey="sales"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-[hsl(var(--chart-2))]"
          />
          <Bar
            dataKey="profit"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-[hsl(var(--chart-3))]"
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
} 
