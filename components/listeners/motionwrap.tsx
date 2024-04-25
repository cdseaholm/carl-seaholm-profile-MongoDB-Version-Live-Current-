'use client'

import { motion } from 'framer-motion';

const MotionWrap = ({children, key}: {children: React.ReactNode; key: string}) => {
    return (
        <motion.div
        key={key}
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
};

export default MotionWrap;