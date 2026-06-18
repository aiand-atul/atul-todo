"use client";

import { useState, useRef } from "react";

interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  category: string;
  createdAt: string;
}

const CATEGORIES = [
  { name: "My Day", emoji: "👤" },
  { name: "Personal", emoji: "🏠" },
  { name: "Work", emoji: "💼" },
  { name: "Shopping", emoji: "🛒" },
  { name: "Fitness", emoji: "💪" },
  { name: "Travel", emoji: "✈️" },
  { name: "Learning", emoji: "📚" },
  { name: "Add", emoji: "➕" },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "Morning workout",
      description: "30 min cardio + strength",
      completed: true,
      category: "Fitness",
      createdAt: "2h",
    },
    {
      id: 2,
      text: "Review project proposal",
      description: "Check mockups and estimates",
      completed: false,
      category: "Work",
      createdAt: "4h",
    },
    {
      id: 3,
      text: "Grocery shopping",
      description: "Milk, eggs, bread, veggies",
      completed: false,
      category: "Shopping",
      createdAt: "5h",
    },
    {
      id: 4,
      text: "Read 20 pages",
      description: "Atomic Habits - Chapter 5",
      completed: true,
      category: "Learning",
      createdAt: "8h",
    },
    {
      id: 5,
      text: "Call mom",
      description: "Weekly family catch-up",
      completed: false,
      category: "Personal",
      createdAt: "1d",
    },
    {
      id: 6,
      text: "Plan weekend trip",
      description: "Book hotel and check itinerary",
      completed: false,
      category: "Travel",
      createdAt: "1d",
    },
  ]);

  const [activeTab, setActiveTab] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoDesc, setNewTodoDesc] = useState("");
  const [newTodoCategory, setNewTodoCategory] = useState("Personal");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function addTodo() {
    if (!newTodoText.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText.trim(),
      description: newTodoDesc.trim() || "No description",
      completed: false,
      category: newTodoCategory,
      createdAt: "now",
    };
    setTodos((prev) => [newTodo, ...prev]);
    setNewTodoText("");
    setNewTodoDesc("");
    setShowAddModal(false);
  }

  const categoryColor: Record<string, string> = {
    "My Day": "#E1306C",
    Personal: "#833AB4",
    Work: "#405DE6",
    Shopping: "#F77737",
    Fitness: "#FCAF45",
    Travel: "#00D2D3",
    Learning: "#5F27CD",
    Add: "#636e72",
  };

  function getCategoryClass(cat: string) {
    const c = categoryColor[cat] || "#636e72";
    return {
      borderColor: c,
    };
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold tracking-tight">Atul Todo</h1>
          <div className="flex items-center gap-0">
            <button className="rounded-full p-2 hover:bg-neutral-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </button>
            <button className="rounded-full p-2 hover:bg-neutral-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Stories / Categories strip */}
      <div className="mx-auto max-w-md">
        <div className="flex gap-4 overflow-x-auto border-b border-neutral-800 px-4 py-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              className="flex shrink-0 flex-col items-center gap-1"
              onClick={() => {
                if (cat.name === "Add") {
                  setShowAddModal(true);
                }
              }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border-[3px]"
                style={{
                  borderColor: categoryColor[cat.name] || "#636e72",
                  ...(cat.name === "My Day"
                    ? {
                        background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                      }
                    : {}),
                }}
              >
                <span className="text-2xl">{cat.emoji}</span>
              </div>
              <span className="text-[11px] font-medium text-neutral-300">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{todos.length}</span>
              <span className="text-[10px] uppercase tracking-wide text-neutral-400">Total</span>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-rose-400">{activeCount}</span>
              <span className="text-[10px] uppercase tracking-wide text-neutral-400">Active</span>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-emerald-400">{completedCount}</span>
              <span className="text-[10px] uppercase tracking-wide text-neutral-400">Done</span>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-transform active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Task
          </button>
        </div>

        {/* Feed */}
        <div className="pb-20">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
              <div className="mb-4 text-6xl">📭</div>
              <p className="text-lg font-medium">No tasks yet</p>
              <p className="text-sm">Tap + to add your first task</p>
            </div>
          ) : (
            todos.map((todo) => (
              <article
                key={todo.id}
                className="border-b border-neutral-800"
              >
                {/* Task header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: categoryColor[todo.category]
                          ? `${categoryColor[todo.category]}22`
                          : "#636e7222",
                        color: categoryColor[todo.category] || "#636e72",
                        border: `2px solid ${categoryColor[todo.category] || "#636e72"}`,
                      }}
                    >
                      {todo.category[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{todo.category}</p>
                      <p className="text-xs text-neutral-500">{todo.createdAt} ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-800 hover:text-red-400"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>

                {/* Task body (square card style) */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="relative aspect-square w-full overflow-hidden"
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                    style={{
                      background: todo.completed
                        ? "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"
                        : `linear-gradient(135deg, ${categoryColor[todo.category] || "#636e72"}22 0%, #0a0a0a 100%)`,
                    }}
                  >
                    <div className="flex flex-col items-center gap-3 px-8">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          todo.completed
                            ? "border-emerald-500 bg-emerald-500/20"
                            : "border-white/30 bg-white/5"
                        }`}
                      >
                        {todo.completed ? (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                        )}
                      </div>
                      <h3
                        className={`text-center text-xl font-bold leading-tight ${
                          todo.completed
                            ? "text-neutral-500 line-through"
                            : "text-white"
                        }`}
                      >
                        {todo.text}
                      </h3>
                      <p
                        className={`text-center text-sm ${
                          todo.completed ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        {todo.description}
                      </p>
                    </div>
                  </div>

                  {/* Completed overlay */}
                  {todo.completed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </div>
                    </div>
                  )}
                </button>

                {/* Task actions */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`transition-colors ${
                        todo.completed
                          ? "text-emerald-400"
                          : "text-neutral-300 hover:text-rose-400"
                      }`}
                    >
                      {todo.completed ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      )}
                    </button>
                    <button className="text-neutral-300 hover:text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </button>
                    <button className="text-neutral-300 hover:text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                  </div>
                  <button className="text-neutral-300 hover:text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 21 5 21 5 3 12 3 19 3 19 21"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-around py-2">
          <button
            className={`flex flex-col items-center gap-0.5 p-2 ${activeTab === "home" ? "text-white" : "text-neutral-500"}`}
            onClick={() => setActiveTab("home")}
          >
            {activeTab === "home" ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.1L2 10v11h8v-7h4v7h8V10L12 2.1z"/></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            )}
          </button>
          <button
            className={`flex flex-col items-center gap-0.5 p-2 ${activeTab === "search" ? "text-white" : "text-neutral-500"}`}
            onClick={() => setActiveTab("search")}
          >
            {activeTab === "search" ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            )}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex flex-col items-center gap-0.5 p-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
          </button>
          <button
            className={`flex flex-col items-center gap-0.5 p-2 ${activeTab === "reels" ? "text-white" : "text-neutral-500"}`}
            onClick={() => setActiveTab("reels")}
          >
            {activeTab === "reels" ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>
          <button
            className={`flex flex-col items-center gap-0.5 p-2 ${activeTab === "profile" ? "text-white" : "text-neutral-500"}`}
            onClick={() => setActiveTab("profile")}
          >
            <div className={`h-7 w-7 overflow-hidden rounded-full border-2 ${activeTab === "profile" ? "border-white" : "border-neutral-600"}`}>
              <div className="flex h-full w-full items-center justify-center bg-neutral-700 text-xs font-bold">A</div>
            </div>
          </button>
        </div>
        <div className="h-2 bg-neutral-950" />
      </nav>

      {/* Add Todo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">New Task</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-full p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Photo upload area (Instagram style) */}
            <div className="mb-4 flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-800/50">
              <div className="flex flex-col items-center gap-2 text-neutral-400">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span className="text-xs">Add cover image</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="What do you need to do?"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTodo();
                }}
              />
              <input
                type="text"
                placeholder="Add a description..."
                value={newTodoDesc}
                onChange={(e) => setNewTodoDesc(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
              <div className="flex gap-2 overflow-x-auto pb-1">
                {CATEGORIES.filter((c) => c.name !== "Add").map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setNewTodoCategory(cat.name)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                      newTodoCategory === cat.name
                        ? "border-transparent bg-rose-500 text-white"
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                    }`}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={addTodo}
              disabled={!newTodoText.trim()}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-rose-500 to-violet-500 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:shadow-rose-500/30 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
            >
              Share Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
