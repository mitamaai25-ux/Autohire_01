import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { skillsRadarData } from '../dashboardMockData';

const RADAR_FILL = 'rgba(122, 213, 255, 0.35)';
const RADAR_STROKE = '#7ad5ff';

export default function SkillsRadar() {
  return (
    <article className="fd-card fd-chart-card fd-radar-card">
      <h3 className="fd-card-title">Skills Radar</h3>
      <p className="fd-card-desc">Normalized strength across dimensions</p>
      <div className="fd-chart-wrap fd-radar-wrap">
        <ResponsiveContainer width="100%" height={240}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsRadarData}>
            <PolarGrid stroke="rgba(127, 160, 255, 0.25)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#b5c4ea', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#a9bee9', fontSize: 10 }} />
            <Radar name="Score" dataKey="value" stroke={RADAR_STROKE} fill={RADAR_FILL} strokeWidth={1.5} />
            <Legend
              wrapperStyle={{ fontSize: '11px' }}
              formatter={() => <span style={{ color: '#b5c4ea' }}>Score</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
