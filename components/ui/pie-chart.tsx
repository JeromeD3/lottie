"use client"

import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"

const data = [
  { name: "Desktop", value: 40 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 25 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))"
]

export function PieChartDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {payload[0].name}
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].value}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        </RePieChart>
      </ResponsiveContainer>
    </motion.div>
  )
} 
