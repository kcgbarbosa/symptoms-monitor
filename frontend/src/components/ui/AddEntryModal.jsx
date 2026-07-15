import { useState } from 'react';
import { useEntriesStore } from '../../../store/useEntriesStore';
import {
  getSeverityLevel,
  SEVERITY_COLORS,
} from '../../utils/severityConstants';
import IconGrid from '../IconPicker/IconGrid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_NOTES_LENGTH = 500;
const MAX_NAME_LENGTH = 40;

const fieldLabel = 'text-sm font-medium text-foreground';

function AddEntryModal() {
  const {
    addEntry,
    updateEntry,
    formData,
    setFormData,
    loading,
    entries,
    isModalOpen,
    closeModal,
  } = useEntriesStore();

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const isEditing = Boolean(formData?.id);
  const severity = Number(formData.severity) || 5;
  const severityColors = SEVERITY_COLORS[getSeverityLevel(severity)];

  const handleOpenChange = (open) => {
    if (!open) {
      setFilteredSuggestions([]);
      closeModal();
    }
  };

  const getLastIconForSymptom = (name) => {
    const key = (name || '').trim().toLowerCase();
    if (!key) return null;

    const match = [...entries].reverse().find((entry) => {
      const entryKey = (entry.symptom_name || '').trim().toLowerCase();
      return entryKey === key;
    });

    return match?.icon_name || null;
  };

  const entryNames = [...new Set(entries.map((e) => e.symptom_name))];

  const handleNameChange = (value) => {
    const name = value.slice(0, MAX_NAME_LENGTH);
    const normalizedInput = name.trim().toLowerCase();
    const lastIcon = getLastIconForSymptom(name);

    setFormData({
      ...formData,
      symptom_name: name,
      ...(lastIcon ? { icon_name: lastIcon } : {}),
    });

    if (!normalizedInput) {
      setFilteredSuggestions([]);
    } else {
      setFilteredSuggestions(
        entryNames.filter((n) => n.toLowerCase().includes(normalizedInput))
      );
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const lastIcon = getLastIconForSymptom(suggestion);
    setFormData({
      ...formData,
      symptom_name: suggestion,
      ...(lastIcon ? { icon_name: lastIcon } : {}),
    });
    setFilteredSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.id) {
      await updateEntry(formData.id);
    } else {
      await addEntry();
    }
    setFilteredSuggestions([]);
    closeModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {isEditing ? 'Edit Entry' : 'Add New Entry'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update your entry details.'
              : "Start typing to reuse a symptom you've logged before."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="relative space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="symptom_name" className={fieldLabel}>
                Symptom name
              </label>
              <span className="text-xs text-muted-foreground tabular-nums">
                {(formData.symptom_name || '').length}/{MAX_NAME_LENGTH}
              </span>
            </div>
            <Input
              id="symptom_name"
              type="text"
              placeholder="e.g. Fatigue, Joint Pain…"
              value={formData.symptom_name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={() => {
                const trimmedName = formData.symptom_name.trim();
                if (trimmedName !== formData.symptom_name) {
                  setFormData({ ...formData, symptom_name: trimmedName });
                }
              }}
              autoComplete="off"
            />

            {filteredSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 z-100 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-md">
                {filteredSuggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="w-full rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <label className={fieldLabel}>Select icon</label>
            <div className="rounded-lg border border-border bg-muted/30 p-2">
              <IconGrid
                selectedIcon={formData.icon_name}
                onSelectIcon={(iconName) =>
                  setFormData({ ...formData, icon_name: iconName })
                }
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className={fieldLabel}>Severity</label>
              <span
                className={cn(
                  'text-lg font-bold tabular-nums',
                  severityColors.text
                )}
              >
                {severity}
              </span>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[severity]}
              onValueChange={([val]) =>
                setFormData({ ...formData, severity: String(val) })
              }
              className={cn(
                severityColors.text,
                '**:data-[slot=slider-range]:bg-current **:data-[slot=slider-thumb]:border-current'
              )}
            />
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="date_of_symptom" className={fieldLabel}>
              Date of symptom
            </label>
            <Input
              id="date_of_symptom"
              type="date"
              value={formData.date_of_symptom}
              onChange={(e) =>
                setFormData({ ...formData, date_of_symptom: e.target.value })
              }
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="notes" className={fieldLabel}>
                Notes
              </label>
              <span className="text-xs text-muted-foreground tabular-nums">
                {(formData.notes || '').length}/{MAX_NOTES_LENGTH}
              </span>
            </div>
            <Textarea
              id="notes"
              placeholder="How are you feeling otherwise? (optional)"
              value={formData.notes}
              maxLength={MAX_NOTES_LENGTH}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="h-24 resize-none"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="min-w-[120px]"
              disabled={
                !formData.symptom_name ||
                !formData.severity ||
                !formData.date_of_symptom ||
                loading
              }
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : isEditing ? (
                'Save Changes'
              ) : (
                'Save Entry'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEntryModal;
