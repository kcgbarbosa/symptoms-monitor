import { KPICard, KPICardHeader, KPICardStat, KPICardMeta } from './shared';

// Presentational card for the label + metric + caption pattern shared by the
// dashboard and trends stat cards. Data is derived by the page and passed in.
function StatKPICard({ label, value, valueLabel, caption }) {
  return (
    <KPICard>
      <KPICardHeader label={label} />
      <KPICardStat value={value} label={valueLabel} />
      {caption != null && <KPICardMeta>{caption}</KPICardMeta>}
    </KPICard>
  );
}

export default StatKPICard;
