'use client'


import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2,
        }}>
            {children}
        </motion.div>
    );
}