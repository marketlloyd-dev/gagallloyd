import { useApp } from '../context/AppContext';
import { BarChart3 } from 'lucide-react';

export default function PollWidget() {
  const { poll, votePoll } = useApp();

  if (!poll) return null;

  const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={20} className="text-green-400" />
        <h3 className="text-white font-bold text-lg">Jajak Pendapat</h3>
      </div>
      <p className="text-white font-medium mb-3">{poll.question}</p>
      <div className="space-y-2">
        {poll.options.map((opt, i) => {
          const percentage = totalVotes > 0 ? ((opt.votes || 0) / totalVotes) * 100 : 0;
          return (
            <button
              key={i}
              onClick={() => votePoll(i)}
              className="w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="text-white text-sm">{opt.text}</span>
                <span className="text-green-300 text-xs">{Math.round(percentage)}%</span>
              </div>
              <div
                className="absolute left-0 top-0 bottom-0 bg-green-500/20 rounded-xl transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </button>
          );
        })}
      </div>
      <p className="text-green-400/50 text-xs mt-3">Total suara: {totalVotes}</p>
    </div>
  );
}