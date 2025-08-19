import React, { useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import type { AggregateStatesSalesType } from "../../types";
import { Equal, Triangle } from "lucide-react";
//

function AnimateNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1990 });
    return controls.stop;
  }, [value, motionValue]);

  return <motion.stop>{rounded}</motion.stop>;
}

type StatesListProps = {
  data: Array<AggregateStatesSalesType>;
  setData: React.Dispatch<React.SetStateAction<AggregateStatesSalesType[]>>;
};

export default function StatesList({ data, setData }: StatesListProps) {
  return (
    <div className="w-full">
      <ul>
        <AnimatePresence>
          {data.map((item, index) => (
            <motion.li
              key={item.label}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                background: item.highlight ? "blue" : "white",
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                layout: { duration: 2 },
                type: "spring",
                stiffness: 1000,
                damping: 30,
              }}
              onAnimationComplete={() => {
                if (item.highlight) {
                  setData((prev) =>
                    prev.map((ite) =>
                      ite.id === item.id ? { ...ite, highlight: false } : ite
                    )
                  );
                }
              }}
              className="p-3 my-2 bg-blue-100"
            >
              <div className="flex justify-between font-bold ">
                <div className="flex gap-2 items-center">
                  <span
                    className="rounded-full h-4 w-4"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>
                    <img
                      src={item.flag_url}
                      className="aspect-square object-contain h-10"
                    />
                  </span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AnimateNumber value={item.dataSum} />
                  <span>
                    {item.previousIndex === index ? (
                      <Equal stroke="#C8BE09" />
                    ) : item.previousIndex > index ? (
                      <Triangle fill="green" stroke="green" />
                    ) : (
                      <Triangle fill="red" stroke="red" style={{ rotate: "180deg" }} />
                    )}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
