import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "../../RevealOnScroll";

export const MicrokARts = () => {

    return (
        <section 
            id="microkarts" 
            className="min-h-screen w-screen flex items-center justify-center relative"
        >
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                {/* Left Column: Text Content */}
                <div className="text-center z-10 px-4 flex-1 flex-col items-center justify-center relative">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent leading-right">
                        MicrokARts
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default MicrokARts;