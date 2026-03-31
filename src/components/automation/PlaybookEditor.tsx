import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  BackgroundVariant,
  Handle,
  Position,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Shield,
  Play,
  Bell,
  Database,
  GitBranch,
  Settings,
  Plus,
  Save,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Search,
  Trash2,
  PanelLeft,
  PanelRight,
  GripVertical,
} from "lucide-react";

// --- Types ---
type NodeType =
  | "trigger"
  | "action"
  | "condition"
  | "notification"
  | "connector";

interface NodeData {
  label: string;
  description?: string;
  type: NodeType;
  icon?: string;
}

// --- Icon Mapping ---
const IconMap: Record<string, React.ElementType> = {
  Shield,
  Play,
  Bell,
  Database,
  GitBranch,
  Settings,
  Zap,
};

// --- Node Styles ---
const nodeStyles = {
  trigger: {
    border: "border-orange-200",
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badge: "Trigger",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  action: {
    border: "border-blue-200",
    bg: "bg-white",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "Action",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  condition: {
    border: "border-purple-200",
    bg: "bg-white",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: "Condition",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  notification: {
    border: "border-rose-200",
    bg: "bg-white",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    badge: "Notification",
    badgeColor: "bg-rose-100 text-rose-700",
  },
  connector: {
    border: "border-gray-200",
    bg: "bg-white",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    badge: "Connector",
    badgeColor: "bg-gray-100 text-gray-700",
  },
};

// --- Custom Node Component ---
const PlaybookNode = ({
  data,
  selected,
}: {
  data: NodeData;
  selected: boolean;
}) => {
  const style = nodeStyles[data.type] || nodeStyles.action;
  const Icon = IconMap[data.icon || "Settings"] || Settings;
  const isCondition = data.type === "condition";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        relative group w-64 rounded-xl border-2 shadow-sm transition-all duration-200
        ${style.bg} ${style.border}
        ${selected ? "ring-2 ring-indigo-500/20 border-indigo-400 shadow-md" : "hover:shadow-md"}
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-white !border-2 !border-gray-400 !-left-1.5"
      />

      {isCondition ? (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="yes"
            className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-white !-right-1.5 !top-1/3"
          />
          <Handle
            type="source"
            position={Position.Right}
            id="no"
            className="!w-3 !h-3 !bg-rose-500 !border-2 !border-white !-right-1.5 !top-2/3"
          />
        </>
      ) : (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white !-right-1.5"
        />
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg ${style.iconBg} ${style.iconColor} shrink-0`}
          >
            <Icon size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide mb-1 ${style.badgeColor}`}
            >
              {style.badge}
            </div>
            <h3 className="text-gray-900 font-semibold text-sm leading-tight truncate">
              {data.label}
            </h3>
            {data.description && (
              <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">
                {data.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <div
          className={`absolute inset-y-0 left-0 w-1 rounded-l-xl ${data.type === "trigger" ? "bg-orange-400" : data.type === "condition" ? "bg-purple-400" : data.type === "notification" ? "bg-rose-400" : "bg-blue-400"}`}
        />
      )}
    </motion.div>
  );
};

const nodeTypes: NodeTypes = { playbookNode: PlaybookNode };

// --- Collapsible Panel Components ---

const CollapsiblePanel = ({
  isOpen,
  onToggle,
  side,
  children,
  title,
  icon: Icon,
}: {
  isOpen: boolean;
  onToggle: () => void;
  side: "left" | "right";
  children: React.ReactNode;
  title: string;
  icon: React.ElementType;
}) => {
  return (
    <>
      {/* The Panel */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : side === "left" ? -320 : 320,
          opacity: isOpen ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          absolute top-[56px] bottom-0 w-80 bg-white border-gray-200 shadow-2xl z-20 flex flex-col
          ${side === "left" ? "left-0 border-r" : "right-0 border-l"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Icon size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
          >
            {side === "left" ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
      </motion.div>

      {/* Toggle Button (Visible when collapsed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onToggle}
            className={`
              absolute top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-lg 
              hover:shadow-xl hover:border-gray-300 transition-all p-2 rounded-full
              ${side === "left" ? "left-4" : "right-4"}
            `}
          >
            <div className="flex items-center gap-2">
              <Icon size={18} className="text-gray-600" />
              {side === "left" ? (
                <ChevronRight size={16} className="text-gray-400" />
              ) : (
                <ChevronLeft size={16} className="text-gray-400" />
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Node Library Content ---

const NodeLibraryContent = () => {
  const onDragStart = (
    e: React.DragEvent,
    type: NodeType,
    label: string,
    desc: string,
    icon: string,
  ) => {
    const data: NodeData = { type, label, description: desc, icon };
    e.dataTransfer.setData("application/reactflow", "playbookNode");
    e.dataTransfer.setData("application/nodeData", JSON.stringify(data));
    e.dataTransfer.effectAllowed = "move";
  };

  const NodeItem = ({
    type,
    icon: Icon,
    label,
    desc,
    colorClass,
    bgClass,
  }: any) => (
    <div
      draggable
      onDragStart={(e) =>
        onDragStart(e, type, label, desc, Icon.displayName || "Settings")
      }
      className="group flex items-center gap-3 p-3 mb-2 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md cursor-grab active:cursor-grabbing transition-all"
    >
      <div className={`p-2 rounded-lg ${bgClass} ${colorClass}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-gray-900 text-sm font-medium">{label}</h4>
        <p className="text-gray-500 text-xs truncate">{desc}</p>
      </div>
      <GripVertical className="text-gray-300 w-4 h-4 opacity-0 group-hover:opacity-100" />
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={14}
        />
        <input
          type="text"
          placeholder="Search nodes..."
          className="w-full pl-9 pr-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Trigger
        </h4>
        <NodeItem
          type="trigger"
          icon={Shield}
          label="Detection Rule"
          desc="Initiate Workflow"
          colorClass="text-orange-600"
          bgClass="bg-orange-100"
        />
      </div>
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Action
        </h4>
        <NodeItem
          type="action"
          icon={Zap}
          label="Block IP"
          desc="Block Source IP"
          colorClass="text-blue-600"
          bgClass="bg-blue-100"
        />
        <NodeItem
          type="action"
          icon={Settings}
          label="Lock Account"
          desc="Disable user access"
          colorClass="text-blue-600"
          bgClass="bg-blue-100"
        />
      </div>
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Conditions
        </h4>
        <NodeItem
          type="condition"
          icon={GitBranch}
          label="If Condition"
          desc="Branch workflow"
          colorClass="text-purple-600"
          bgClass="bg-purple-100"
        />
      </div>
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Notification
        </h4>
        <NodeItem
          type="notification"
          icon={Bell}
          label="Notify Team"
          desc="Send alert"
          colorClass="text-rose-600"
          bgClass="bg-rose-100"
        />
      </div>
    </div>
  );
};

// --- AI Builder Content ---

const AIBuilderContent = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode] = useState(`playbook:
  name: Auto Block Brute Force
  trigger:
    type: detection_rule
    rule: Failed Logins
    threshold: 10
  actions:
    - block_ip:
        target: source_ip
    - notify_soc:
        channels: [slack]`);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe Automation
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="When there are more than 10 failed login attempts..."
          className="w-full h-28 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
        />
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <Sparkles size={16} /> Generate
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Refine
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Generated Code
          </label>
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            YAML
          </span>
        </div>
        <textarea
          value={generatedCode}
          readOnly
          className="w-full h-48 p-3 bg-gray-900 text-green-400 font-mono text-xs rounded-xl resize-none focus:outline-none"
        />
      </div>
    </div>
  );
};

// --- Canvas Area ---

const CanvasArea = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "playbookNode",
      position: { x: 100, y: 200 },
      data: {
        type: "trigger",
        label: "Detection Rule Trigger",
        description: "When Multiple Failed Admin Logins",
        icon: "Shield",
      },
    },
    {
      id: "2",
      type: "playbookNode",
      position: { x: 450, y: 200 },
      data: {
        type: "condition",
        label: "If Severity Critical",
        description: "Check threat level",
        icon: "GitBranch",
      },
    },
    {
      id: "3",
      type: "playbookNode",
      position: { x: 800, y: 100 },
      data: {
        type: "action",
        label: "Block Source IP",
        description: "Prevent further access",
        icon: "Zap",
      },
    },
    {
      id: "4",
      type: "playbookNode",
      position: { x: 800, y: 300 },
      data: {
        type: "action",
        label: "Lock Account",
        description: "Disable compromised account",
        icon: "Settings",
      },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "smoothstep",
      style: { stroke: "#94a3b8", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      sourceHandle: "yes",
      label: "Yes",
      type: "smoothstep",
      style: { stroke: "#10b981", strokeWidth: 2 },
      labelStyle: { fill: "#10b981", fontWeight: 600 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      sourceHandle: "no",
      label: "No",
      type: "smoothstep",
      style: { stroke: "#f43f5e", strokeWidth: 2 },
      labelStyle: { fill: "#f43f5e", fontWeight: 600 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#f43f5e" },
    },
  ]);

  const { project } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            style: { stroke: "#94a3b8", strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("application/reactflow");
      const rawData = e.dataTransfer.getData("application/nodeData");
      if (!type || !reactFlowWrapper.current) return;
      const data = JSON.parse(rawData);
      const position = project({
        x: e.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: e.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      });
      setNodes((nds) =>
        nds.concat({
          id: `${data.type}-${Date.now()}`,
          type: "playbookNode",
          position,
          data,
        }),
      );
    },
    [project, setNodes],
  );

  return (
    <div className="absolute inset-0 bg-gray-50" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#cbd5e1"
        />
        <Controls className="bg-white border-gray-200 shadow-md [&>button]:bg-white [&>button]:border-gray-200" />
      </ReactFlow>
    </div>
  );
};

// --- Main App ---

export default function PlaybookEditorEdit() {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden font-sans text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0 z-30 relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>Automation</span>
              <ChevronRight size={14} />
              <span className="text-gray-900 font-medium">Playbook Editor</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Playbook Editor</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Design adaptive playbooks to automate security responses.
            </p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={18} /> Create Playbook
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Playbook Name
            </label>
            <input
              type="text"
              defaultValue="Block Malicious IPs"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Choose a Trigger
            </label>
            <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none">
              <option>Detection Rule Trigger</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Status
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-700 font-medium">Active</span>
            </div>
          </div>
          <div className="col-span-4">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Description
            </label>
            <input
              type="text"
              defaultValue="Automatically block external IPs after repeated failed login attempts."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-12 bg-white border-b border-gray-200 px-4 flex items-center justify-between shrink-0 z-30 relative">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-gray-900 border-b-2 border-orange-500 pb-3 pt-2.5">
            Workflow Builder
          </span>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button className="flex items-center gap-1.5 hover:text-gray-900">
              <Save size={16} /> Save
            </button>
            <button className="flex items-center gap-1.5 hover:text-gray-900">
              <Play size={16} /> Run Test
            </button>
            <button className="flex items-center gap-1.5 hover:text-red-600 text-red-500">
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLeftOpen(!isLeftOpen)}
            className={`p-2 rounded-lg transition-colors ${isLeftOpen ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <PanelLeft size={18} />
          </button>
          <button
            onClick={() => setIsRightOpen(!isRightOpen)}
            className={`p-2 rounded-lg transition-colors ${isRightOpen ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <PanelRight size={18} />
          </button>
        </div>
      </div>

      {/* Canvas with Floating Panels */}
      <div className="flex-1 relative overflow-hidden">
        <ReactFlowProvider>
          <CanvasArea />

          <CollapsiblePanel
            isOpen={isLeftOpen}
            onToggle={() => setIsLeftOpen(!isLeftOpen)}
            side="left"
            title="Node Library"
            icon={Database}
          >
            <NodeLibraryContent />
          </CollapsiblePanel>

          <CollapsiblePanel
            isOpen={isRightOpen}
            onToggle={() => setIsRightOpen(!isRightOpen)}
            side="right"
            title="AI Builder"
            icon={Sparkles}
          >
            <AIBuilderContent />
          </CollapsiblePanel>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
