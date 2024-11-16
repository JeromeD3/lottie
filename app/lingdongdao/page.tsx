'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function DynamicIsland() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,0.3),rgba(0,0,0,0.4))]" />
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 dark:from-emerald-500/10 dark:to-cyan-500/10 rounded-full blur-[120px]" />
      
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
        initial={false}
        animate={{
          width: isExpanded ? 350 : (isHovered ? 140 : 120),
          height: isExpanded ? 180 : 37,
          borderRadius: 20,
          scale: 1,
        }}
        whileTap={{ scale: 0.97 }}
        transition={{
          layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          width: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
            bounce: 0
          },
          height: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
            bounce: 0
          },
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }}
        className="bg-[#1c1c1e] cursor-pointer relative flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm z-10 border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-[20px]" />
        
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div 
              key="small"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3 px-3 z-20"
            >
              <motion.div 
                animate={{
                  scale: [1, 1.2, 1],
                  backgroundColor: ['#22c55e', '#16a34a', '#22c55e']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
              />
              <motion.span 
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0.9 }}
                className="text-white/90 text-[13px] font-medium tracking-tight"
              >
                正在播放
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 w-full z-20"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="w-[68px] h-[68px] bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
                <div className="flex-1">
                  <motion.h3 
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/90 font-medium text-[15px]"
                  >
                    正在播放音乐
                  </motion.h3>
                  <motion.p 
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/50 text-[13px] mt-1"
                  >
                    歌手名称 - 歌曲名称
                  </motion.p>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex justify-between items-center"
              >
                <div className="relative w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ 
                      duration: 2,
                      ease: "linear",
                      repeat: Infinity
                    }}
                    className="absolute left-0 top-0 h-full bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  />
                </div>
                <div className="text-white/80 text-[13px] font-medium">3:45</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
