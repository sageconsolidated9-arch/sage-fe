// components/modals/WhatsNewModal.tsx
import { motion, AnimatePresence } from "motion/react";
import { StarsIcon, XIcon } from "../../../utils/icons";

interface WhatsNewModalProps {
  isOpen: boolean;
  position: { top: number; left: number } | null;
  onClose: () => void;
}

const WhatsNewModal = ({ isOpen, position, onClose }: WhatsNewModalProps) => {
  if (!isOpen || !position) {
    return null;
  }

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-transparent z-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="fixed z-100 bg-white rounded-2xl border border-gray-200 shadow-top-search w-[794px] max-h-[1299px] overflow-y-auto"
          style={{
            top: `${position.top + 20}px`,
            left: `${position.left - 450}px`,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-[27px] py-[18.3px] text-text-secondary leading-[100%] tracking-[2%]">
            <div className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <StarsIcon className="text-primary" />
                  <h3 className="text-[20px]">What’s New in Your SOC</h3>
                </div>

                <button className="flex items-center gap-1 cursor-pointer">
                  <XIcon className="text-[#1E1A19]" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-[20px] font-bold mt-4 mb-6">
                Feature-Focused Updates
              </h2>

              {/* June 30, 2025 */}
              <div className="mb-6 border-b border-[#DAD3CE] pb-[15px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="">June 30, 2025</h3>
                </div>
                <p className="mb-1">
                  Fresh tools, fewer headaches. Here's what just landed...
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className=" mr-2">•</span>
                    <span className="">
                      Threat Map Goes Live – Watch attacks pop up on a real-time
                      world map.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="">
                      IoC Super Search – Hunt down sketchy IPs, hashes, and
                      domains.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="">
                      Rule Builder Glow-Up – Build detections in plain English
                      or DSL.
                    </span>
                  </li>
                </ul>
              </div>

              {/* view full release */}
              <button className="cursor-pointer underline text-primary text-sm">
                View Full Release Notes
              </button>
            </div>

            {/* dummy feature two */}
            <div>
              <h2 className="text-[20px] font-bold mt-4 mb-6">
                Feature-Focused Updates
              </h2>

              {/* June 30, 2025 */}
              <div className="mb-6 border-b border-[#DAD3CE] pb-[15px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="">June 30, 2025</h3>
                </div>
                <p className="mb-1">
                  Fresh tools, fewer headaches. Here's what just landed...
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className=" mr-2">•</span>
                    <span className="">
                      Threat Map Goes Live – Watch attacks pop up on a real-time
                      world map.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="">
                      IoC Super Search – Hunt down sketchy IPs, hashes, and
                      domains.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="">
                      Rule Builder Glow-Up – Build detections in plain English
                      or DSL.
                    </span>
                  </li>
                </ul>
              </div>

              {/* view full release */}
              <button className="cursor-pointer underline text-primary text-sm">
                View Full Release Notes
              </button>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default WhatsNewModal;
