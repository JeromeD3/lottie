"use client"

import { motion } from "framer-motion"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts"

const data = [
  {
    subject: 'Performance',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Security',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Reliability',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Scalability',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Efficiency',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Usability',
    A: 65,
    B: 85,
    fullMark: 150,
  },
]

export function RadarChartDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="hsl(var(--muted-foreground))" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 150]} 
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Radar
            name="Product A"
            dataKey="A"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.5}
          />
          <Radar
            name="Product B"
            dataKey="B"
            stroke="hsl(var(--chart-2))"
            fill="hsl(var(--chart-2))"
            fillOpacity={0.3}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-2">
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-8">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {entry.name}
                          </span>
                          <span className="font-bold">
                            {entry.value}
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
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
} 
