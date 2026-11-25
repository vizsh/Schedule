import React, { useState } from 'react';
import { Users, Shield, CheckCircle2, Award, Mail, ExternalLink, ListTodo, Plus, Trash2 } from 'lucide-react';
import { TEAM_OUTLIERS } from '../data/hackathonsData';

export default function TeamHub() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('outliers_team_tasks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 1, text: 'Record 2-minute demo video for LogiTHON 2026', owner: 'Jeevesh Bodhani', due: '29 Nov', done: false, hackathon: 'LogiTHON' },
      { id: 2, text: 'Finalize 2036 autonomous systems architecture doc for BUILD 2036', owner: 'Shreyas Kale', due: '29 Nov', done: false, hackathon: 'BUILD 2036' },
      { id: 3, text: 'Document 5 customer discovery interviews for Build It With AI', owner: 'Vrindaa Talwar', due: '30 Nov', done: false, hackathon: 'Build It With AI' },
      { id: 4, text: 'Prepare B2B predictive wallet share model proposal for Creative Newtech', owner: 'Swayam Panchal', due: '30 Nov', done: false, hackathon: 'Creative Newtech' },
      { id: 5, text: 'Export CCTV inference test logs for Maruti Suzuki Smart Mobility deck', owner: 'Dravvya Jain', due: '30 Nov', done: false, hackathon: 'Maruti Suzuki' },
      { id: 6, text: 'Push edge container updates to GAVS Tech4Bharat prototype branch', owner: 'Rishit Lahoti', due: '10 Dec', done: false, hackathon: 'GAVS Tech4Bharat' }
    ];
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskOwner, setNewTaskOwner] = useState(TEAM_OUTLIERS.members[0].name);

  const saveTasks = (next) => {
    setTasks(next);
    localStorage.setItem('outliers_team_tasks', JSON.stringify(next));
  };

  const toggleTask = (id) => {
    const next = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    saveTasks(next);
  };

  const deleteTask = (id) => {
    const next = tasks.filter(t => t.id !== id);
    saveTasks(next);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const task = {
      id: Date.now(),
      text: newTaskText.trim(),
      owner: newTaskOwner,
      due: '30 Nov',
      done: false,
      hackathon: 'Team Sprint'
    };
    saveTasks([task, ...tasks]);
    setNewTaskText('');
  };

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-1.5">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            TEAM OUTLIERS COMMAND
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Team Outliers Roster &amp; Delegation Hub
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {TEAM_OUTLIERS.institution} • SIH ID: <strong>{TEAM_OUTLIERS.sihTeamId}</strong> • GAVS ID: <strong>{TEAM_OUTLIERS.gavsRegId.slice(0, 14)}...</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {completedCount}/{tasks.length} Sprint Tasks Done
          </span>
        </div>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {TEAM_OUTLIERS.members.map((member, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-xs transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs shadow-indigo-300">
                {member.avatar}
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-slate-900 text-sm truncate">
                  {member.name}
                </h5>
                <p className="text-[11px] text-slate-500 font-medium truncate">
                  {member.role}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                {member.email}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Task Delegation Checklist */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ListTodo className="w-4 h-4 text-indigo-600" />
            Sprint Task Delegation &amp; Submission Readiness
          </h4>
          <span className="text-xs text-slate-500 font-mono">
            {Math.round((completedCount / (tasks.length || 1)) * 100)}% Ready
          </span>
        </div>

        {/* Add task row */}
        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new milestone task for Team Outliers..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500"
          />
          <select
            value={newTaskOwner}
            onChange={(e) => setNewTaskOwner(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 text-slate-700"
          >
            {TEAM_OUTLIERS.members.map((m, i) => (
              <option key={i} value={m.name}>{m.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Task
          </button>
        </form>

        {/* Task list */}
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 transition ${
                task.done
                  ? 'bg-emerald-50/50 border-emerald-200 text-slate-400'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div 
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-2.5 flex-1 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {}} // Controlled via parent div click
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 shrink-0 pointer-events-none"
                />
                <span className={`font-medium ${task.done ? 'line-through' : ''}`}>
                  {task.text}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {task.owner}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Due {task.due}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
