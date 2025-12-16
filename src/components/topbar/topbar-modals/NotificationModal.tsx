// components/modals/NotificationsModal.tsx
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRightIcon, RefreshIcon, XIcon } from "../../../utils/icons";
import { InfoIcon } from "lucide-react";

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "warning" | "info" | "success" | "alert";
}

const NotificationsModal = ({
  isOpen,
  position,
  onClose,
}: {
  isOpen: boolean;
  position: { top: number; left: number } | null;
  onClose: () => void;
}) => {
  const notifications: NotificationItem[] = [
    {
      id: 1,
      title: "New vulnerability detected",
      description: "Critical vulnerability detected in your system",
      date: "12th December, 2025",
      time: "16:45",
      type: "alert",
    },
    {
      id: 2,
      title: "New user created",
      description: "A new user account was created",
      date: "10th December, 2025",
      time: "20:48",
      type: "success",
    },
    {
      id: 3,
      title: "Incident Resolved",
      description: "Security incident has been resolved",
      date: "12th December, 2025",
      time: "16:45",
      type: "info",
    },
    {
      id: 4,
      title: "Trial plan expires soon",
      description: "Upgrade to continue using all features",
      date: "Today",
      time: "",
      type: "warning",
    },
    {
      id: 5,
      title: "Trial plan expires soon",
      description: "Upgrade to continue using all features",
      date: "Today",
      time: "",
      type: "warning",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "text-text-primary";
      case "warning":
        return "text-text-primary";
      case "success":
        return "text-success";
      case "info":
        return "text-primary";
      default:
        return "text-primary";
    }
  };
  const getTypeBg = (type: string) => {
    switch (type) {
      case "alert":
        return "border-l-2 border-primary bg-[#FA4F190A] py-1 pr-[6px] pl-[14px]";
      case "warning":
        return "border-l-2 border-[#FF9000] bg-[#FA4F190A] py-1 pr-[6px] pl-[14px]";
      case "success":
        return "bg-[#38A1690A] py-2 pr-[6px] pl-[14px]";
      case "info":
        return "bg-[#FA4F190A] py-2 pr-[6px] pl-[14px]";
      default:
        return "bg-[#FA4F190A] py-2 pr-[6px] pl-[14px]";
    }
  };

  if (!isOpen || !position) {
    return null;
  }

  return (
    <AnimatePresence>
      <>
        <motion.div
          className="fixed inset-0 bg-transparent z-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="fixed z-100 bg-white rounded-2xl shadow-top-search w-[545px] max-h-[618px] overflow-y-auto"
          style={{
            top: `${position.top + 10}px`,
            left: `${position.left - 380}px`,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-[27px] py-[18.3px] text-text-secondary leading-[100%] tracking-[2%]">
            <div className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <h3 className="lead">Notification</h3>

                <button className="cursor-pointer">
                  <RefreshIcon className="text-[#1E1A19]" />
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={` ${getTypeBg(notification.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {(notification.type === "success" ||
                          notification.type === "info") && (
                          <InfoIcon
                            className={`${getTypeColor(
                              notification.type
                            )} w-[18px] aspect-square`}
                          />
                        )}
                        <h4 className={` ${getTypeColor(notification.type)}`}>
                          {notification.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{notification.date}</span>
                        {notification.time && (
                          <>
                            <span>•</span>
                            <span>{notification.time}</span>
                          </>
                        )}
                      </div>
                      {notification.type === "warning" && (
                        <button className="px-2 py-[3px] bg-transparent text-[#FF9000] text-[10px] cursor-pointer rounded-lg border border-[#FF9000] transition-colors w-fit mt-1">
                          View summary
                        </button>
                      )}
                      {notification.type === "alert" && (
                        <button className="px-2 py-[3px] bg-transparent text-primary text-xs cursor-pointer w-fit mt-1 flex items-center gap-1">
                          <ArrowUpRightIcon />
                          View
                        </button>
                      )}
                    </div>
                    <button>
                      <XIcon className="text-text-secondary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default NotificationsModal;
