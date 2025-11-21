import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { Task } from '../types';
import Card from '../components/Card';

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;

    try {
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'tasks'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTaskTitle.trim()) return;

    try {
      const newTask: Omit<Task, 'id'> = {
        title: newTaskTitle,
        done: false,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'users', user.uid, 'tasks'), newTask);
      
      setNewTaskTitle('');
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleTask = async (task: Task) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid, 'tasks', task.id), {
        done: !task.done,
      });
      loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'tasks', id));
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const activeTasks = tasks.filter(t => !t.done);
  const completedTasks = tasks.filter(t => t.done);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">✅ Gift Ideas & Tasks</h1>
          <p className="text-gray-600 mt-2">Keep track of gift ideas and things to do</p>
        </div>

        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Add a new task or gift idea..."
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Add
            </button>
          </form>
        </Card>

        {loading ? (
          <Card>
            <p className="text-gray-500 text-center">Loading tasks...</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <Card title="📝 To Do">
                <div className="space-y-2">
                  {activeTasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <button
                        onClick={() => toggleTask(task)}
                        className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded hover:border-primary-500 transition"
                      />
                      <span className="flex-1 text-gray-800">{task.title}</span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <Card title="✅ Completed">
                <div className="space-y-2">
                  {completedTasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                    >
                      <button
                        onClick={() => toggleTask(task)}
                        className="flex-shrink-0 w-6 h-6 bg-green-500 rounded flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <span className="flex-1 text-gray-600 line-through">{task.title}</span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {tasks.length === 0 && (
              <Card>
                <p className="text-gray-500 text-center">No tasks yet. Add your first gift idea or task!</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
