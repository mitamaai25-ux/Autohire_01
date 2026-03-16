import { FeedbackModule } from '@/components/feedback/feedback-module';

export default function FeedbackPage() {
  return (
    <div className="space-y-4">
      <header className="card p-4">
        <h1 className="text-2xl font-semibold">Feedback</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">Pulse surveys, anonymous feedback, eNPS, and sentiment trends.</p>
      </header>
      <FeedbackModule />
    </div>
  );
}
